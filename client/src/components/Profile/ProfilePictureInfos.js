import React, { useEffect, useState } from "react";
import classes from "./ProfilePictureInfos.module.css";
import {
  BsFillCameraFill,
  BsFillFileImageFill,
  BsPencilFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import ProfilePicture from "./ProfilePicture";

const ProfilePictureInfos = ({ user, visitor }) => {
  const [show, setShow] = useState(false);
  const  [picture, setPicture] = useState(user.picture);
  useEffect(()=> {
    setPicture(picture);
  }, [picture])
  return (
    <div className={classes.profile_img_wrap}>
      {show && <ProfilePicture user={user} setShow={setShow} setPicture={setPicture} />}
      <div className={classes.profile_w_left}>
        <div className={classes.profile_w_img}>
          <div
            className={classes.profile_w_bg}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${picture})`,
            }}
          ></div>
          {!visitor && (
            <div className={`${classes.profile_circle}`} onClick={() => setShow((prev) => !prev)}>
              <i>
                <BsFillCameraFill color="black" size="2rem" />
              </i>
            </div>
          )}
        </div>
        <div className={classes.profile_w_col}>
          <div className={classes.profile_name}>{user.username}</div>
          <div className={classes.profile_friend_count}></div>
          <div className={classes.profile_friend_imgs}></div>
        </div>
      </div>
      {!visitor && (
        <div className={classes.profile_w_right}>
          <div className={`${classes.gray_btn} hover1`}>
            <i>
              <BsPencilFill />
            </i>
            <span>Edit Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;
