import React, { useState } from "react";
// Nested components
import Board from "./Board";
// helpers
import { applyMinimax, calculateWinner } from "../helpers";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [isAImode, setIsAImode] = useState(true);
  const [isAIturn, setIsAIturn] = useState(false);

  let winner = calculateWinner(board);

  const printWinner = () => {
    if (winner === "tie") {
      return `It's a Tie!`;
    } else {
      return `${winner} Wins!`;
    }
  };

  // AI Player's Move
  const playMove = (gameBoard) => {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (gameBoard[i] === null) {
        gameBoard[i] = "O";
        let score = applyMinimax(gameBoard, false);
        gameBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    const boardCopy = [...gameBoard];

    boardCopy[bestMove] = "O";
    setBoard(boardCopy);
    setIsAIturn((prevIsAIturn) => !prevIsAIturn);
    setXisNext((prevXisNext) => !prevXisNext);
  };

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i] || (isAImode && isAIturn)) return;

    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext((prevXisNext) => !prevXisNext);
    // check if there is a winner or a tie
    winner = calculateWinner(boardCopy);

    if (isAImode && !winner) {
      setIsAIturn((prevIsAIturn) => !prevIsAIturn);
      setTimeout(() => {
        playMove(boardCopy);
      }, 1500);
    }
  };

  const resetGame = () => {
    if (isAIturn) {
      return;
    } else {
      setBoard(Array(9).fill(null));
      setXisNext(true);
      setIsAIturn(false);
    }
  };

  return (
    <div>
      <h1 className="heading"> Tic Tac Toe !</h1>
      <div className="parent-container">
        <div className="btn-container">
          <div className="container">
            <h2>VS Computer Mode</h2>
            <label className="switch">
              <input
                type="checkbox"
                checked={isAImode}
                onChange={() => setIsAImode(!isAImode)}
              />
              <div></div>
            </label>
          </div>
          <button
            type="reset"
            className="reset-btn"
            onClick={() => resetGame()}
          >
            Reset
          </button>
        </div>
        <div>
          <Board boxes={board} onClick={handleClick} />
          <h2 className="winner">{winner ? printWinner() : null}</h2>
        </div>
      </div>
    </div>
  );
};

export default Game;
