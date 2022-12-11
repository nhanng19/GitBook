import React from "react";
import NavBar from "../NavBar/NavBar";
import Content from "./Content";
import classes from "./Main.module.css";
import SideBar from "./SideBar";

const Main = (props) => {
  return (
    <>
      <NavBar />
      <Content>
        <SideBar />
        <main className={classes.main}>{props.children}</main>
      </Content>
    </>
  );
};

export default Main;
