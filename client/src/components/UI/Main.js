import React from 'react';
import classes from './Main.module.css';

const Main = (props) => {
    return (
        <main className={classes.main}>
            {props.children}
        </main>
    );
};

export default Main;