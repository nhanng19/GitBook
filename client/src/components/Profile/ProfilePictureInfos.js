import React from "react";
import classes from "./ProfilePictureInfos.module.css";
import {
  BsFillCameraFill,
  BsFillFileImageFill,
  BsPencilFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";

const ProfilePictureInfos = () => {
  const userPicture =
    "https://res.cloudinary.com/dc2xiz0gi/image/upload/v1671125789/profileImgs/i5jfxsozvva85zhjhqz0.png";
  return (
    <div className={classes.profile_img_wrap}>
      <div className={classes.profile_w_left}>
        <div className={classes.profile_w_img}>
          <div
            className={classes.profile_w_bg}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${userPicture})`,
            }}
          ></div>
          <div className={`${classes.profile_circle}`}>
            <i>
              <BsFillCameraFill color="black" size="2rem" />
            </i>
          </div>
        </div>
        <div className={classes.profile_w_col}>
          <div className={classes.profile_name}>
            Richard You
          </div>
          <div className={classes.profile_friend_count}></div>
          <div className={classes.profile_friend_imgs}></div>
        </div>
      </div>
      <div className={classes.profile_w_right}>
        <div className={classes.gray_btn}>
          <i>
            <BsPencilFill />
          </i>
          <span>Edit Profile</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureInfos;
