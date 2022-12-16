import React, { useState } from "react";
import classes from "./UpdateProfilePicture.module.css";
import { BsXLg } from "react-icons/bs";

const UpdateProfilePicture = ({ setImage, image }) => {
  const [description, setDescription] = useState("");
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
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className={`${classes.textarea_blue} ${classes.details_input}`}
        ></textarea>
      </div>
      <div className={classes.update_center}>
        <div className={classes.cropper}>
          {/* <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
