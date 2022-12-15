import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import classes from "./SearchBar.module.css";
import SearchMenu from "./SearchMenu";

const SearchBar = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  return (
    <div className={classes.header}>
      <form
        action="#"
        className={classes.search}
        onClick={() => setShowSearchMenu(true)}
      >
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
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}
    </div>
  );
};

export default SearchBar;
