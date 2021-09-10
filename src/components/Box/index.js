import React from "react";
// styles
import "./styles.css";

const Box = ({ value, onClick }) => {
  const boxStyle = value ? `box ${value}` : `box`;
  return (
    <button className={boxStyle} onClick={onClick}>
      {value}
    </button>
  );
};

Box.defaultProps = {
  value: null,
  onClick: () => null,
};

export default Box;
