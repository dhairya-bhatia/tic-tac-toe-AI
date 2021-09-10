export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let item of lines) {
    const [a, b, c] = item;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Check for a tie
  let openSpots = 0;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      openSpots++;
    }
  }
  if (openSpots === 0) {
    return "tie";
  } else {
    return null;
  }
};

let scores = {
  X: -10,
  O: 10,
  tie: 0,
};

export const applyMinimax = (board, isMaximizing, isProAImode) => {
  if (!isProAImode) {
    // return a random int b/w 0 to 9 as score
    return Math.floor(Math.random() * 10);
  } else {
    let result = calculateWinner(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        // Checking for available spot
        if (board[i] === null) {
          board[i] = "O";
          let score = applyMinimax(board, false, isProAImode);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        // Checking for available spot
        if (board[i] === null) {
          board[i] = "X";
          let score = applyMinimax(board, true, isProAImode);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
};
