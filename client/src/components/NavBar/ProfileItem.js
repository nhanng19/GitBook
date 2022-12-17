/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ProfileItem.module.css";

const ProfileItem = ({ username, picture }) => {
  
  return (
    <NavLink className={classes.profile_link} to={`/profile/${username}/about`}>
      <img src={picture} alt="User" className={classes.nav__profile} />
      <span className={classes.username}>{username}</span>
    </NavLink>
  );
};

export default ProfileItem;
