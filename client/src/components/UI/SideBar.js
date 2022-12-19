import React, { useEffect } from "react";
import classes from "./SideBar.module.css";
import {
  FaHome,
  FaClipboardCheck,
  FaFolder,
  FaDonate,
  FaSignOutAlt,
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaUser,
} from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import Auth from "../..//utils/auth.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SideBar = (props) => {
  const [navOpen, setNavOpen] = useState();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  useEffect(() => {
    setNavOpen(true)
  },[])
  return (
    <nav className={classes.sidebar}>
      {navOpen && (
        <>
          <ul className={classes.side_nav}>
            <NavLink
              style={{ textDecoration: "none" }}
              className={(navData) => (navData.isActive ? classes.active : "")}
              to={`/profile/${props.username}/projects`}
            >
              <SideBarItem name="PROFILE" href="">
                <FaUser size="2rem" color="#333" />
              </SideBarItem>
            </NavLink>
            {/* <NavLink
              className={classes.profile_link}
              to={`/profile/${props.username}/projects`}
            >
              <img
                src={props.picture}
                alt="User"
                className={classes.nav__profile}
              />

              <span className={classes.username}>PROFILE</span>
            </NavLink> */}
            <NavLink
              style={{ textDecoration: "none" }}
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              <>
                <SideBarItem name="HOME" href="">
                  <FaHome size="2rem" color="#333" />
                </SideBarItem>
              </>
            </NavLink>

            <NavLink
              style={{ textDecoration: "none" }}
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/dashboard"
            >
              <>
                <SideBarItem name="DASHBOARD" href="">
                  <FaClipboardCheck size="2rem" color="#333" />
                </SideBarItem>
              </>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none" }}
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/about"
            >
              <>
                <SideBarItem name="ABOUT" href="">
                  <FaFolder size="2rem" color="#333" />
                </SideBarItem>
              </>
            </NavLink>

            <SideBarItem
              name="DONATION"
              href="https://donate.stripe.com/test_bIY00k8w9eTw1AQ9AA"
            >
              <FaDonate size="2rem" color="#333" />
            </SideBarItem>

            <SideBarItem name="LOGOUT" onClick={logout} href="">
              <FaSignOutAlt size="2rem" color="#333" />
            </SideBarItem>
          </ul>
        </>
      )}
      {navOpen ? (
        <button
          className={classes.hamburger}
          onClick={() => setNavOpen(!navOpen)}
        >
          <FaChevronCircleUp />
        </button>
      ) : (
        <button
          className={classes.hamburger}
          onClick={() => setNavOpen(!navOpen)}
        >
          <FaChevronCircleDown />
        </button>
      )}
    </nav>
  );
};

export default SideBar;
