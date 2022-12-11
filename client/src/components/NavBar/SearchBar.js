import React from 'react';
import { FaSearch } from 'react-icons/fa';
import classes from './SearchBar.module.css';

const SearchBar = () => {
    return (
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
    );
};

export default SearchBar;