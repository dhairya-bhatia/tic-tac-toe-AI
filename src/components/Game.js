import React, { useState, useEffect, useCallback } from "react";
// Nested components
import Board from "./Board";
// helpers
import { applyMinimax, calculateWinner } from "../helpers";

const Game = () => {
  // local state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [xIsNext, setXisNext] = useState(true);
  const [isAImode, setIsAImode] = useState(true);
  const [isAIturn, setIsAIturn] = useState(false);
  const [isProAImode, setIsProAImode] = useState(true);

  // Handles Reset Button Click
  const resetGame = useCallback(() => {
    if (isAIturn) {
      return;
    } else {
      setBoard(Array(9).fill(null));
      setXisNext(true);
      setIsAIturn(false);
      setWinner(null);
    }
  }, [isAIturn]);

  let resultMsg = "";

  // Alert in case of a Win or a Tie
  useEffect(() => {
    if (winner) {
      if (window.confirm(`${resultMsg} Play Again ?`)) {
        resetGame();
      }
    }
  }, [resultMsg, winner, resetGame]);

  // Print Winner's Name or Tie
  const printWinner = () => {
    if (winner === "tie") {
      resultMsg = `It's a Tie!`;
    } else {
      resultMsg = `${winner} Wins!`;
    }
    return resultMsg;
  };

  // Prints the player having current turn
  const checkTurn = () => {
    if (isAImode) {
      return xIsNext ? `X's Turn` : `AI is Thinking...`;
    } else {
      return xIsNext ? `X's Turn` : `O's Turn`;
    }
  };

  // handles toggle for AI and Pro Mode buttons
  const toggleMode = (isToggleAIbtn) => {
    isToggleAIbtn
      ? setIsAImode((prevmode) => !prevmode)
      : setIsProAImode((prevMode) => !prevMode);
    resetGame();
  };

  // AI Player's Move
  const playMove = (gameBoard) => {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (gameBoard[i] === null) {
        gameBoard[i] = "O";
        let score = applyMinimax(gameBoard, false, isProAImode);
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
    if (!winner) {
      const isWinner = calculateWinner(boardCopy);
      isWinner && setWinner(isWinner);
    }
  };

  // Handles Square Click
  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i] || (isAImode && isAIturn)) return;

    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext((prevXisNext) => !prevXisNext);
    // check if there is a winner or a tie
    const isWinner = calculateWinner(boardCopy);
    isWinner && setWinner(isWinner);

    if (isAImode && !isWinner) {
      setIsAIturn((prevIsAIturn) => !prevIsAIturn);
      setTimeout(() => {
        playMove(boardCopy);
      }, 1500);
    }
  };

  return (
    <div>
      <h1 className="heading"> Tic Tac Toe !</h1>
      <div className="parent-container">
        <div className="btn-container">
          <div className="container">
            <h2>Play With AI</h2>
            <label className="switch">
              <input
                type="checkbox"
                checked={isAImode}
                disabled={isAIturn}
                onChange={() => toggleMode(true)}
              />
              <div></div>
            </label>
          </div>
          {isAImode && (
            <div className="container">
              <h2>Pro AI </h2>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isProAImode}
                  disabled={isAIturn}
                  onChange={() => toggleMode(false)}
                />
                <div></div>
              </label>
            </div>
          )}
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
          <span className={winner ? "winner" : "bottom-txt"}>
            {winner ? printWinner() : checkTurn()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;
