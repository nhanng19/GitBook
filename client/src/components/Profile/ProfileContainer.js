/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import classes from "./ProfileContainer.module.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";


const ProfileContainer = ({ user, visitor }) => {
  // const [currentDetails, setCurrentDetails] = useState(user.details);
  // const [currentUsername, setCurrentUsername] = useState(user.username);
  // const [currentVisitor, setCurrentVisitor] = useState(visitor);
  const details = user.details;
  const username = user.username;
  const projects = user.projects;

  const [currentUser, setCurrentUser] = useState([details, username, visitor, projects]);

  return (
    <div className={classes.profile}>
      <div className={classes.profile_top}>
        <div className={classes.profile_container}>
          <Cover cover={user.cover} visitor={visitor} />
          <ProfilePictureInfos user={user} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className={classes.profile_bottom}>
        <div className={classes.profile_container}>
          <div className={classes.bottom_container}>
            <Outlet context={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
