import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavBarItems from "./NavBarItems";

import classes from "./NavBar.module.css";

const NavBar = () => {
  const { username } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: username },
  });
  const user = data?.user || {};
  return (
    <header className={classes.navbar}>
      <Logo />
      <SearchBar />
      <NavBarItems username={user.username} picture={user.picture} />
    </header>
  );
};

export default NavBar;
