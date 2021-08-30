import React from "react";

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
  onClick: () => {},
};

export default Box;
