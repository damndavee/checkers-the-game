import React from 'react';
import { useSelector } from 'react-redux';

function App() {

  const board = useSelector(state => state.board);


  console.log(board);

  return (
    <React.Fragment>
      <h1>CHECKERS</h1>
    </React.Fragment>
  );
}

export default App;
