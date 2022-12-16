import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProfileMenu.module.css";

const ProfileMenu = () => {
  return (
    <div className={classes.profile_menu_wrap}>
      <div className={classes.profile_menu}>
        <Link to="/" className={`${classes.profile_menu_active} ${classes.hover}`}>
          Projects
        </Link>
        <Link to="/" className={`${classes.active} ${classes.hover}`}>
          About
        </Link>
        <Link to="/" className={`${classes.active} ${classes.hover}`}>
          Friends
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
