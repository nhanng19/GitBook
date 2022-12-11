import React from "react";
import { FaUserFriends, FaEnvelope } from "react-icons/fa";
import classes from './NavBarItems.module.css';
import profile from "../../assets/profile(test).png";

const NavBarItems = () => {
  return (
    <nav className={classes.user_nav}>
      <div className={classes.user_nav__icon_box}>
        <svg className={classes.nav__icon}>
          <FaUserFriends size="2.5rem" />
        </svg>
        <span className={classes.user_nav__notification}>7</span>
      </div>
      <div className={classes.user_nav__icon_box}>
        <svg className={classes.nav__icon}>
          <FaEnvelope size="2.5rem" />
        </svg>
        <span className={classes.user_nav__notification}>13</span>
      </div>
      <div className={classes.user_nav__user}>
        <img src={profile} alt="User" className={classes.nav__profile} />
        <span className="user-nav__user-name">Username</span>
      </div>
    </nav>
  );
};

export default NavBarItems;
