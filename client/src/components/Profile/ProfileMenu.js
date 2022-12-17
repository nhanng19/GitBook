import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProfileMenu.module.css";

const ProfileMenu = () => {
  return (
    <div className={classes.profile_menu_wrap}>
      <div className={classes.profile_menu}>
        <Link to="/" className={`${classes.profile_menu_active} hover1`}>
          Projects
        </Link>
        <Link to="/" className={`${classes.active} hover1`}>
          About
        </Link>
        <Link to="/" className={`${classes.active} hover1`}>
          Friends
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
