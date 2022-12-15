import React, { useRef } from "react";
import classes from "./ProfilePicture.module.css";
import { BsXLg, BsPlusLg } from "react-icons/bs";

const ProfilePicture = () => {
  const refInput = useRef(null);
  const handleImage = () => {};
  return (
    <div className="blur">
      <input type="file" ref={refInput} hidden onChange={handleImage} />
      <div className={`postBox ${classes.pictureBox}`}>
        <div className="box_header">
          <div className={classes.box_circle}>
            <i>
              <BsXLg />
            </i>
          </div>
          <span>Update Profile Picture</span>
        </div>
        <div className={classes.update_picture_wrap}>
            <div className={classes.update_picture_button}>
                <button className={classes.light_blue_btn}>
                    <i>
                        <BsPlusLg />
                    </i>
                    Upload Photo
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
