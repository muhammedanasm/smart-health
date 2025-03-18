import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaCalendarAlt } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      //   path: "/dashboard",
    },
    {
      label: "Shift",
      path: "/",
    },
    {
      label: "Blocks",
      path: "/blocks",
    },
    {
      label: "Rooms",
      path: "/rooms",
    },
    {
      label: "Room Schedule",
      path: "/roomshedule",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            <FaCalendarAlt className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
