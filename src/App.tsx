import React from 'react';
import Header from './Header';
import Lhs from './Lhs';
import Calendar from './Calendar';
import Rhs from './Rhs';

const App: React.FC<{}> = () => {
  return (
    <div id="app">
      <Header />
      <Lhs />
      <Calendar />
      <Rhs />
    </div>
  );
};

export default App;
