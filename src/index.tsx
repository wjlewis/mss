import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// const schedule = {
//   halfDays: [
//     {
//       docs: [0, 1],
//       onCall: 1,
//       date: '01/01/0000A',
//     },
//     {
//       docs: [0, 1],
//       onCall: 1,
//       date: '01/01/0000P',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 0,
//       date: '01/02/0000A',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 0,
//       date: '01/02/0000P',
//     },
//     {
//       docs: [1, 2],
//       onCall: 1,
//       date: '01/03/0000A',
//     },
//     {
//       docs: [1, 2],
//       onCall: 1,
//       date: '01/03/0000P',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 1,
//       date: '01/04/0000A',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 1,
//       date: '01/04/0000P',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 0,
//       date: '01/05/0000A',
//     },
//     {
//       docs: [0, 1, 2],
//       onCall: 0,
//       date: '01/05/0000P',
//     },
//   ],
// };
//
// const params = {
//   popSize: 100,
//   crossoverCount: 10,
//   mutationProbability: 0.2,
//   fairnessPenalty: 1,
//   onCallPenalty: 3,
//   fullDayPenalty: 2,
//   assignmentTargets: {
//     0: 3.3,
//     1: 3.3,
//     2: 3.3,
//   },
//   iterations: 100,
// };
//
// run(schedule, params).then(console.log);
