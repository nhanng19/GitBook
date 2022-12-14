import React from "react";
import classes from "./SideBar.module.css";
import {
  FaHome,
  FaClipboardCheck,
  FaFolder,
  FaDonate,
  FaSignOutAlt,
  FaRocketchat,
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
          to="/About"
        >
          <SideBarItem name="ABOUT" href="">
            <FaFolder size="2rem" color="#333" />
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
          to="/Chat"
        >
          <SideBarItem name="Chat" href="">
            <FaRocketchat size="2rem" color="#333" />
          </SideBarItem>
        </NavLink>

          <SideBarItem name="DONATION" href="https://donate.stripe.com/test_bIY00k8w9eTw1AQ9AA">
            <FaDonate size="2rem" color="#333" />
          </SideBarItem>

        <SideBarItem name="LOGOUT" onClick={logout} href="">
          <FaSignOutAlt size="2rem" color="#333" />
        </SideBarItem>
      </ul>
    </nav>
  );
};

export default SideBar;
