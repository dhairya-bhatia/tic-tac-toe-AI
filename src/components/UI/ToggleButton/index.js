import React from "react";
// styles
import "./styles.css";

const ToggleButton = ({ btnTitle, checked, disabled, handleChange }) => {
  return (
    <>
      <h2>{btnTitle}</h2>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <div></div>
      </label>
    </>
  );
};
export default ToggleButton;
