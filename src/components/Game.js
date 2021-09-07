import React, { useState } from "react";
// Nested components
import Board from "./Board";
// helpers
import { calculateWinner } from "../helpers";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [openSpots, setOpenSpots] = useState(9);

  const printWinner = () => {
    if (!winner) {
      if (openSpots > 0) {
        return null;
      } else {
        return `It's a Tie`;
      }
    } else {
      return `${winner} Wins!`;
    }
  };
  let winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;

    boardCopy[i] = xIsNext ? "X" : "O";
    setOpenSpots(openSpots - 1);
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };
  return (
    <div>
      <h1 className="heading"> Tic Tac Toe !</h1>
      <div className="parent-container">
        <div class="container">
          <h2>VS Computer Mode</h2>
          <label class="switch">
            <input type="checkbox" /> <div></div>
          </label>
        </div>
        <div>
          <Board boxes={board} onClick={handleClick} />
          <h2 className="winner">{printWinner()}</h2>
        </div>
      </div>
    </div>
  );
};

export default Game;
