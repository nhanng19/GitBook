import React from "react";
import Content from "./Content";
import classes from "./Main.module.css";
import SideBar from "./SideBar";
import Auth from "../../utils/auth";
const Main = (props) => {
  return (
    <>
      <Content>
        {Auth.loggedIn() && <SideBar />}
        <main className={Auth.loggedIn() ? classes.main : ""}>
          {props.children}
        </main>
      </Content>
    </>
  );
};

export default Main;
