import React, { useRef, useState } from "react";
import classes from "./ProfilePicture.module.css";
import { BsXLg, BsPlusLg } from "react-icons/bs";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from '../../helpers/useClickOutside';

const ProfilePicture = ({ user, setShow, setPicture }) => {
  const refInput = useRef(null);
  const popup = useRef(null);
  useClickOutside(popup, () => setShow(false))
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="blur" ref={popup}>
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg, image/png, image/webp, image/gif"
      />
      <div className={`postBox ${classes.pictureBox}`} >
        <div className="box_header">
          <div className={`small_circle`} onClick={() => setShow(false)}>
            <i>
              <BsXLg />
            </i>
          </div>
          <span>Update Profile Picture</span>
        </div>
        <div className={classes.update_picture_wrap}>
          <div className={classes.update_picture_button}>
            <button
              className="blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i>
                <BsPlusLg />
              </i>
              Upload Photo
            </button>
          </div>
        </div>
        {error && (
          <div className={`${classes.postError} ${classes.comment_error}`}>
            <div className={classes.postError_error}>{error}</div>
            <button
              className="bluebtn"
              onClick={() => {
                setError("");
              }}
            >
              Try again
            </button>
          </div>
        )}
        <div className={classes.old_pictures_wrap}></div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          user={user}
          setShow = {setShow}
          setPicture = {setPicture}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
