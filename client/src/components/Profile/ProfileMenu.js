import React from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./ProfileMenu.module.css";

const ProfileMenu = () => {
  const params = useParams();
  return (
    <div className={classes.profile_menu_wrap}>
      <div className={classes.profile_menu}>
        <NavLink
          to={`projects`}
          className={(navData) =>
            navData.isActive
              ? `${classes.profile_menu_active} hover1`
              : "hover1"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to={`about`}
          className={(navData) =>
            navData.isActive
              ? `${classes.profile_menu_active} hover1`
              : "hover1"
          }
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileMenu;
