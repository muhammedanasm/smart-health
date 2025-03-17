import React from "react";
import "./button.css";

const Button = ({ label, customStyles, icon, onClick }) => {
  return (
    <div>
      <div>
        <button style={customStyles} className="btn-styles" onClick={onClick}>
          {icon && <span className="btn-icon">{icon}</span>}
          {label}
        </button>
      </div>
    </div>
  );
};

export default Button;
