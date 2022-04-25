import React from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board/Board';

function App() {

  const board = useSelector(state => state.board);


  console.log(board);

  return (
    <React.Fragment>
      <Board />
    </React.Fragment>
  );
}

export default App;
