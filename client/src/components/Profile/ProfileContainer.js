/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";


import classes from "./ProfileContainer.module.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import ProfileAbout from "../ProfileAbout/ProfileAbout";

const ProfileContainer = ({ user, visitor }) => {

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
            <ProfileAbout details={user.details} username={user.username} visitor={visitor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
