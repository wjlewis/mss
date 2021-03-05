import {
  flatten1,
  range,
  randElt,
  repeat,
  groupBy,
  mapValues,
  zipObjects,
  sum,
  zip,
  fiftyFifty,
} from './tools';

export interface HalfDay {
  docs: DocId[];
  onCall: DocId;
  date: DateString;
}

// MM/DD/YYYY:[A|P]
export type DateString = string;

export function dateFromString(d: DateString): string {
  return d.slice(0, -1);
}

export type DocId = number;

export interface Schedule {
  halfDays: HalfDay[];
}

export interface Candidate {
  assignments: DocId[];
}

function assessFitness(
  c: Candidate,
  sched: Schedule,
  params: SimParams
): number {
  // Fairness: do the number of assignments per doc deviate from the targets?
  const assnsByDoc = groupBy(c.assignments, doc => doc);
  const docCounts = mapValues(assnsByDoc, assns => assns.length);
  const deviations = zipObjects(
    docCounts,
    params.assignmentTargets,
    (count, target) => Math.abs(count - target)
  );
  const fairness = params.fairnessPenalty * sum(Object.values(deviations));

  // On Call: is the student assigned to the doctor on call?
  const onCallCount = zip(
    sched.halfDays,
    c.assignments,
    (hd, doc) => hd.onCall === doc
  ).filter(isOnCall => isOnCall).length;
  const onCall = params.onCallPenalty * onCallCount;

  // Full Days: is the student assigned to the same doctor in the AM and PM?
  const withIndexes = sched.halfDays.map((hd, i) => ({
    date: dateFromString(hd.date),
    index: i,
  }));
  const byDate = groupBy(withIndexes, x => x.date);
  const amPmPairs = Object.values(byDate)
    .map(xs => xs.map(({ index }) => index))
    .filter(hdIndexes => hdIndexes.length === 2);

  const amPmAssignments = amPmPairs.map(([amI, pmI]) => [
    c.assignments[amI],
    c.assignments[pmI],
  ]);
  const fullDayCount = amPmAssignments
    .filter(([amDoc, pmDoc]) => amDoc === pmDoc)
    .filter(sameDoc => sameDoc).length;
  const fullDays = params.fullDayPenalty * fullDayCount;

  return fairness + onCall + fullDays;
}

function cross(c1: Candidate, c2: Candidate): Candidate {
  const assignments = zip(c1.assignments, c2.assignments, fiftyFifty);
  return { assignments };
}

function mutate(
  c: Candidate,
  params: SimParams,
  schedule: Schedule
): Candidate {
  const assignments = c.assignments.map((doc, i) => {
    if (Math.random() > params.mutationProbability) {
      const docs = schedule.halfDays[i].docs;
      return randElt(docs);
    } else {
      return doc;
    }
  });

  return { assignments };
}

export interface AssnTargets {
  [doc: number]: number;
}

export interface SimParams {
  popSize: number;
  crossoverCount: number;
  mutationProbability: number;
  fairnessPenalty: number;
  onCallPenalty: number;
  fullDayPenalty: number;
  assignmentTargets: AssnTargets;
  iterations: number;
}

export async function run(
  schedule: Schedule,
  params: SimParams
): Promise<Candidate[]> {
  validateParams(params);
  let pop: Candidate[] = genInitialPop(schedule, params.popSize);
  const genRandomIndex = genCrossoverSelector(params.popSize);

  return new Promise(resolve => {
    function loop(iter = 0) {
      let withFitness = pop.map(c => ({
        candidate: c,
        fitness: assessFitness(c, schedule, params),
      }));
      // Fitness closer to 0 is _more_ fit.
      withFitness.sort((a, b) => a.fitness - b.fitness);
      const byFitness = withFitness.map(({ candidate }) => candidate);

      const bestFitness = withFitness[0].fitness;
      console.log(bestFitness);

      if (iter > params.iterations) {
        return resolve(byFitness);
      }

      const crossovers = range(0, params.crossoverCount).map(_ => {
        const parent1 = byFitness[genRandomIndex()];
        const parent2 = byFitness[genRandomIndex()];

        const child = cross(parent1, parent2);
        return mutate(child, params, schedule);
      });

      const keepers = byFitness.slice(
        0,
        params.popSize - params.crossoverCount
      );

      pop = [...crossovers, ...keepers];

      setTimeout(() => loop(iter + 1), 0);
    }

    loop();
  });
}

function genInitialPop(schedule: Schedule, popSize: number): Candidate[] {
  return range(0, popSize).map(_ => {
    const assignments = schedule.halfDays.map(hd => randElt(hd.docs));
    return { assignments };
  });
}

function genCrossoverSelector(popSize: number): () => number {
  function distributionFn(index: number) {
    return 3 * (popSize - index) + 1;
  }

  const distribution = range(0, popSize).map(index =>
    repeat(index, distributionFn(index))
  );
  const flattened = flatten1(distribution);

  return () => randElt(flattened);
}

function validateParams(params: SimParams) {
  if (params.crossoverCount > params.popSize) {
    throw new Error('crossover count exceeds population size');
  }
  if (params.mutationProbability < 0.0 || params.mutationProbability > 1.0) {
    throw new Error('mutation probability is outside of [0, 1]');
  }
}
