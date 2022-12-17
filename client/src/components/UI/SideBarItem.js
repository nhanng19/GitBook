import React from "react";
import classes from "./SideBarItem.module.css";

const SideBarItem = (props) => {
  return (
    <li className={`${classes.side_nav_item}`}>
      <a
        target="_blank"
        onClick={props.onClick}
        href={props.href}
        className={classes.side_nav_link}
        rel="noreferrer"
      >
        <svg className={classes.side_nav_icon}>{props.children}</svg>
        <span>{props.name}</span>
      </a>
    </li>
  );
};

export default SideBarItem;
