import React from "react";
import "./layout.css";

const Layout = ({ label }) => {
  return (
    <div
      className="main-head-modal"
      style={{ borderRadius: "4px 4px 0px 0px" }}
    >
      <div className="heading">{label}</div>
    </div>
  );
};

export default Layout;
