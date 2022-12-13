import React from "react";
import classes from "./SideBar.module.css";
import {
  FaHome,
  FaClipboardCheck,
  FaFolder,
  FaDonate,
  FaSignOutAlt,
} from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import Auth from "../..//utils/auth.js";
import { NavLink } from "react-router-dom";
const SideBar = (props) => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className={classes.sidebar}>
      <ul className={classes.side_nav}>
        <NavLink
          style={{ textDecoration: "none" }}
          className={(navData) => (navData.isActive ? classes.active : "")}
          to="/Home"
        >
          <SideBarItem name="HOME" href="">
            <FaHome size="2rem" color="#333" />
          </SideBarItem>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          className={(navData) => (navData.isActive ? classes.active : "")}
          to="/Dashboard"
        >
          <SideBarItem name="DASHBOARD" href="">
            <FaClipboardCheck size="2rem" color="#333" />
          </SideBarItem>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          className={(navData) => (navData.isActive ? classes.active : "")}
          to="/Profile"
        >
          <SideBarItem name="PROFILE" href="">
            <FaFolder size="2rem" color="#333" />
          </SideBarItem>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          className={(navData) => (navData.isActive ? classes.active : "")}
          to="/Donation"
        >
          <SideBarItem name="DONATION" href="">
            <FaDonate size="2rem" color="#333" />
          </SideBarItem>
        </NavLink>

        <SideBarItem name="LOGOUT" onClick={logout} href="">
          <FaSignOutAlt size="2rem" color="#333" />
        </SideBarItem>
      </ul>
    </nav>
  );
};

export default SideBar;
