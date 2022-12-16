import React from "react";
import classes from './UpdateProfilePicture.module.css';
import {BsXLg} from 'react-icons/bs'

const UpdateProfilePicture = ({setImage}) => {
  return (
    <div className={`postBox ${classes.update_img}`}>
      <div className="box_header">
        <div className={classes.box_circle} onClick={() => setImage("")}>
          <i>
            <BsXLg />
          </i>
        </div>
        <span>Update Profile Picture</span>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
