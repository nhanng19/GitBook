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

const SideBar = (props) => {
  return (
    <nav className={classes.sidebar}>
      <ul className={classes.side_nav}>
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
          <FaSignOutAlt size="2rem" color="#333" />
        </SideBarItem>
      </ul>
    </nav>
  );
};

export default SideBar;
