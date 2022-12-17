/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";


import classes from "./ProfileContainer.module.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";

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
    </div>
  );
};

export default ProfileContainer;
