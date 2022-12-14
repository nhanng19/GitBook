import React from "react";
import profile from "../../assets/profile(test).png";
import classes from "./ProfileItem.module.css";

const ProfileItem = () => {
  return (
    <div className={classes.user_nav__user}>
      <a className={classes.side_nav_link}>
        <img src={profile} alt="User" className={classes.nav__profile} />
        <span className="user-nav__user-name">Username</span>
      </a>
    </div>
  );
};

export default ProfileItem;
