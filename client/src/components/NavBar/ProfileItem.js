import React from "react";
import { NavLink } from "react-router-dom";
import profile from "../../assets/profile(test).png";
import classes from "./ProfileItem.module.css";

const ProfileItem = () => {
  return (
    <NavLink
      className={(navData) => (navData.isActive ? classes.active : "")}
      to="/myprofile"
    >
      <a className={classes.side_nav_link}>
        <img src={profile} alt="User" className={classes.nav__profile} />
        <span className={classes.username}>Username</span>
      </a>
    </NavLink>
  );
};

export default ProfileItem;
