import React, { useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Content from "./Content";
import classes from "./Main.module.css";
import SideBar from "./SideBar";
import Auth from "../../utils/auth";
import useClickOutside from '../../helpers/useClickOutside';


const Main = (props) => {
  const [visible, setVisible] = useState(false);
  const el = useRef(null);

  useClickOutside(el, () => {
    setVisible(false);
  });      

  return (
    <>
      {Auth.loggedIn() && <NavBar />}
      {visible && <div className={classes.navbar_card} ref={el}></div>}
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
