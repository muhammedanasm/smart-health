import React from "react";

import "./authlayout.css";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="layout">
        <div className="layout-section">
          <>
            <Sidebar />
          </>

          <div className="layout-head-content">
            <Header />
            <main className="content">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
