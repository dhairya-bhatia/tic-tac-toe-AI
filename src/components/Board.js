import React from "react";
// Nested components
import Box from "./Box";

const Board = ({ boxes, onClick }) => {
  return (
    <div className="board">
      {boxes.map((box, i) => (
        <Box key={i} value={box} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;
