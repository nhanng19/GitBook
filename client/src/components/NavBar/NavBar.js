import React from "react";
import classes from "./NavBar.module.css";
import Logo from './Logo';
import SearchBar from "./SearchBar";
import NavBarItems from "./NavBarItems";

const NavBar = () => {
  return (
    <header className={classes.navbar}>
      <Logo />
      <SearchBar />
      <NavBarItems />
    </header>
  );
};

export default NavBar;
