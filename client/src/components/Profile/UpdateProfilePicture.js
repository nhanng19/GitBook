import React, { useCallback, useRef, useState } from "react";
import classes from "./UpdateProfilePicture.module.css";
import { BsXLg, BsCrop } from "react-icons/bs";
import {BiTimer} from 'react-icons/bi'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {MdOutlinePublic} from 'react-icons/md'
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useMutation } from "@apollo/client";
import { ADD_PICTURE } from "../../utils/mutations";

const UpdateProfilePicture = ({ setImage, image, setError, user }) => {
  const [addPicture, { error }] = useMutation(ADD_PICTURE);

  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
          console.log("just show");
        } else {
          console.log("not show");
          console.log(img);
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const UpdateProfilePicture = async() => {
    try {
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'profileImgs');
      const cloudName= "dc2xiz0gi";
      const data = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    console.log(data.url);
      await addPicture({
        variables: {
          picture: data.url,
        },
      });
      
      
    } catch (err) {
      setError(err.response.data.error);
    }
  }

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
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className={classes.slider}>
          <div className={classes.slider_circle} onClick={() => zoomOut()}>
            <i className={classes.icons}>
              <AiOutlineMinus />
            </i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className={classes.slider_circle} onClick={() => zoomIn()}>
            <i className={classes.icons}>
              <AiOutlinePlus />
            </i>
          </div>
        </div>
      </div>
      <div className={classes.flex_up}>
        <div className="grey_btn" onClick={() => getCroppedImage("show")}>
          <i>
            <BsCrop />
          </i>
          Crop photo
        </div>
        <div className="grey_btn">
          <i>
            <BiTimer />
          </i>
          Make Temporary
        </div>
      </div>
      <div className={classes.flex_p_t}>
        <i>
          <MdOutlinePublic />
        </i>
        Your profile picture is public
      </div>
      <div className={classes.update_submit_wrap}>
        <div className={classes.blue_link}>Cancel</div>
        <button className={classes.blue_btn} onClick={() => UpdateProfilePicture()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
