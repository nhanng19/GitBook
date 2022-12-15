import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchMenu.module.css";
import {
  BsSearch,
  BsArrowReturnLeft,
  BsArrowReturnRight,
} from "react-icons/bs";
import useClickOutside from "../../helpers/useClickOutside";

const SearchMenu = ({ setShowSearchMenu }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {input.current.focus()}, [])
  return (
    <div
      className={`${classes.header_left} ${classes.search_area} ${classes.scrollbar}`}
      ref={menu}
    >
      <div className={classes.search_wrap}>
        {/* <div className={classes.header_logo}>
                    <div className={`${classes.circle} ${classes.hover}`}>
                        <BsArrowReturnLeft />
                    </div>
                </div> */}
        <div className={classes.search}>
          <div className={classes.icon}>{iconVisible && <BsSearch />}</div>
          <input
            type="text"
            placeholder="Search GitBook"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className={classes.search_history_header}>
        <span>Recent searches</span>
        <a></a>
      </div>
      <div className={classes.search_history}></div>
      <div className={`${classes.search_results} ${classes.scrollbar}`}></div>
    </div>
  );
};

export default SearchMenu;
