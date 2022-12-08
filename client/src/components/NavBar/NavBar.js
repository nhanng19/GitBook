import React from "react";
import classes from "./NavBar.module.css";
import { FaSearch } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
// import { FaUserAlt } from "react-icons/fa";
import logo from "../../assets/Logo.png";
import profile from '../../assets/profile(test).png';

const NavBar = () => {
  return (
    <header className={classes.navbar}>
      <img src={logo} alt="" className={classes.logo}></img>
      <form action="#" className={classes.search}>
        <input
          type="text"
          className={classes.search__input}
          placeholder="Search friends"
        ></input>
        <button className={classes.search__button}>
          <svg className={classes.search__icon}>
            <FaSearch />
          </svg>
        </button>
      </form>

      <nav className={classes.user_nav}>
        <div className={classes.user_nav__icon_box}>
          <svg className={classes.nav__icon}>
            <FaUserFriends size="2.5rem"/>
          </svg>
          <span class={classes.user_nav__notification}>7</span>
        </div>
        <div className={classes.user_nav__icon_box}>
          <svg className={classes.nav__icon}>
            <FaEnvelope size="2.5rem"/>
          </svg>
          <span class={classes.user_nav__notification}>13</span>
        </div>
        <div className={classes.user_nav__user}>
          <img src={profile} alt="User" className={classes.nav__profile} />
          <span className="user-nav__user-name">Username</span>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
