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
<<<<<<< HEAD
        <SideBarItem name="HOME" href="#" >
          <FaHome size="2rem" color="#333" />
        </SideBarItem>
        <SideBarItem name="DASHBOARD" href="#">
          <FaClipboardCheck size="2rem" color="#333" />
        </SideBarItem>
        <SideBarItem name="PROFILE" href="#">
          <FaFolder size="2rem" color="#333" />
        </SideBarItem>
        <SideBarItem name="DONATION" href="https://donate.stripe.com/test_bIY00k8w9eTw1AQ9AA">
          <FaDonate size="2rem" color="#333" />
        </SideBarItem>
        <SideBarItem name="LOGOUT" href="#">
=======
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
>>>>>>> a5f87ed4f6eb9d4f3cf08ba9a17c7b8e49d745af
          <FaSignOutAlt size="2rem" color="#333" />
        </SideBarItem>
      </ul>
    </nav>
  );
};

export default SideBar;
