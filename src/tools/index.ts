export function flatten1<A>(xss: A[][]): A[] {
  return xss.reduce((acc, xs) => [...acc, ...xs], []);
}

export function range(lo: number, hi: number): number[] {
  const out: number[] = [];

  for (let i = lo; i < hi; i++) {
    out.push(i);
  }

  return out;
}

export function randElt<A>(xs: A[]): A {
  const index = randInRange(0, xs.length);
  return xs[index];
}

export function randInRange(lo: number, hi: number): number {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

export function repeat<A>(x: A, count: number): A[] {
  return range(0, count).map(_ => x);
}

export function groupBy<A>(
  xs: A[],
  sel: (x: A) => string | number
): Record<string | number, A[]> {
  const out: Record<string | number, A[]> = {};

  for (let x of xs) {
    const key = sel(x);
    if (key in out) {
      out[key].push(x);
    } else {
      out[key] = [x];
    }
  }

  return out;
}

export function mapValues(obj: object, fn: (value: any) => any): object {
  const mapped = {};

  for (let key of Object.keys(obj)) {
    (mapped as any)[key] = fn((obj as any)[key]);
  }

  return mapped;
}

export function zipObjects(
  o1: object,
  o2: object,
  fn: (v1: any, v2: any) => any
): object {
  const zipped = {};

  for (let key of Object.keys(o1)) {
    (zipped as any)[key] = fn((o1 as any)[key], (o2 as any)[key]);
  }

  return zipped;
}

export function sum(ns: number[]): number {
  return ns.reduce((acc, n) => acc + n, 0);
}

export function zip<A, B, C>(xs: A[], ys: B[], fn: (x: A, y: B) => C): C[] {
  return xs.map((x, i) => fn(x, ys[i]));
}

export function fiftyFifty<A>(x: A, y: A): A {
  if (Math.random() > 0.5) {
    return x;
  } else {
    return y;
  }
}
