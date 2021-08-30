import React, { useState } from "react";
// Nested components
import Board from "./Board";
// helpers
import { calculateWinner } from "../helpers";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;

    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };
  return (
    <div>
      <h1 className="heading"> Tic Tac Toe !</h1>
      <Board boxes={board} onClick={handleClick} />
    </div>
  );
};

export default Game;
