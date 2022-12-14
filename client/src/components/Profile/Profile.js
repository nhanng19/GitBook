import React from "react";
import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <>
      <div className={classes.flex_container}>
        <div>
          <img
            className={classes.profileImage}
            src="https://res.cloudinary.com/dc2xiz0gi/image/upload/v1670957376/profileImgs/Untitled_design_4_usytaj.png"
          />
        </div>
        <div className={classes.profileHeader}>
          <h1>Username</h1>
          <h1>Github Link</h1>
        </div>
      </div>
      <div className={classes.flex_container}>
        <div className={classes.btns_container}>
          <button>Add/Edit Image</button>
          <button>Edit Profile</button>
        </div>
        <div className={classes.btns_container}>
          <button>Change Password</button>
          <button>SomethingMore</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
