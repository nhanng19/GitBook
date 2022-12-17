import React, { useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Content from "./Content";
import classes from "./Main.module.css";
import SideBar from "./SideBar";
import Auth from "../../utils/auth";
import useClickOutside from "../../helpers/useClickOutside";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Main = (props) => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me;

  const [visible, setVisible] = useState(false);
  const el = useRef(null);

  useClickOutside(el, () => {
    setVisible(false);
  });

if (loading) {
  return <div>Loading...</div>
}
  return (
    <>
      {Auth.loggedIn() && <NavBar />}
      {visible && <div className={classes.navbar_card} ref={el}></div>}
      <Content>
        {Auth.loggedIn() && <SideBar username={user.username} />}
        <main className={Auth.loggedIn() ? classes.main : ""}>
          {props.children}
        </main>
      </Content>
    </>
  );
};

export default Main;
