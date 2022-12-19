import React, { useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Content from "./Content";
import classes from "./Main.module.css";
import SideBar from "./SideBar";
import Auth from "../../utils/auth";
import useClickOutside from "../../helpers/useClickOutside";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../UI/LoadingSpinner"
const Main = (props) => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const [visible, setVisible] = useState(false);
  const el = useRef(null);
  // console.log(user);
  useClickOutside(el, () => {
    setVisible(false);
  });
  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <>
      <Content>
        {Auth.loggedIn() && (
          <SideBar username={user.username} picture={user.picture} />
        )}
        <main
          className={props.profile === "true" ? classes.profile : classes.main}
        >
          {props.children}
        </main>
      </Content>
    </>
  );
};

export default Main;
