import React, { useState, useEffect, useCallback } from "react";
// Nested components
import Board from "components/Board";
// UI components
import ToggleButton from "components/UI/ToggleButton";
// helpers
import { applyMinimax, calculateWinner } from "helpers";
// styles
import "./styles.css";

// Positioning of the Winning Line
const winningLinePosition = {
  "012": { top: "226px", left: "518px" },
  345: { top: "388px", left: "518px" },
  678: { top: "550px", left: "518px" },
  "036": { top: "390px", left: "356px", transform: "rotate(90deg)" },
  147: { top: "390px", left: "520px", transform: "rotate(90deg)" },
  258: { top: "390px", left: "682px", transform: "rotate(90deg)" },
  "048": {
    left: "448px",
    top: "390px",
    transform: "rotate(45deg)",
    width: "590px",
  },
  246: {
    top: "396px",
    left: "444px",
    transform: "rotate(-45deg)",
    width: "590px",
  },
};

const Game = () => {
  // local state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [xIsNext, setXisNext] = useState(true);
  const [isAImode, setIsAImode] = useState(true);
  const [isAIturn, setIsAIturn] = useState(false);
  const [isProAImode, setIsProAImode] = useState(true);
  const [winningLineStyles, setWinningLineStyles] = useState(null);

  // Handles Reset Button Click
  const resetGame = useCallback(() => {
    if (isAIturn) {
      return;
    } else {
      setBoard(Array(9).fill(null));
      setXisNext(true);
      setIsAIturn(false);
      setWinner(null);
      setWinningLineStyles(null);
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
      const winnerObj = calculateWinner(boardCopy);
      if (winnerObj) {
        const { pattern } = winnerObj;
        if (pattern) {
          setWinningLineStyles(winningLinePosition[pattern]);
        }
        setWinner(winnerObj.gameWinner);
      }
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
    const winnerObj = calculateWinner(boardCopy);
    winnerObj && setWinner(winnerObj.gameWinner);
    if (winnerObj) {
      const { pattern } = winnerObj;
      if (pattern) {
        setWinningLineStyles(winningLinePosition[pattern]);
      }
      setWinner(winnerObj.gameWinner);
    }

    if (isAImode && !winnerObj) {
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
            <ToggleButton
              btnTitle={`Play With AI`}
              checked={isAImode}
              disabled={isAIturn}
              handleChange={() => toggleMode(true)}
            />
          </div>
          {isAImode && (
            <div className="container">
              <ToggleButton
                btnTitle={`Pro AI Mode`}
                checked={isProAImode}
                disabled={isAIturn}
                handleChange={() => toggleMode(false)}
              />
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
          {winner && winner !== "tie" && (
            <div style={winningLineStyles} className={"winningLine"}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
