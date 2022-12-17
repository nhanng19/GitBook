import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Cover.module.css";
import { BsFillCameraFill, BsFillFileImageFill } from "react-icons/bs";
import { MdOutlinePublic } from "react-icons/md";
import useClickOutside from "../../helpers/useClickOutside";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useMutation } from "@apollo/client";
import { ADD_COVER } from "../../utils/mutations";

const Cover = ({ cover, visitor }) => {
  const [addCover, { error }] = useMutation(ADD_COVER);

  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverUrl, setCoverUrl] = useState(cover);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const refInput = useRef(null);

  useClickOutside(menuRef, () => setShowCoverMenu(false));
  const [errorCover, setErrorCover] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setErrorCover(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setErrorCover(`${file.name} is too large max 5mb allowed.`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverImage(event.target.result);
    };
  };
  const [coverImage, setCoverImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverImage, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverImage(img);
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
  //   const profileCover = null;
  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const updateCoverPicture = async () => {
    try {
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      // const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "coverImgs");
      const cloudName = "dc2xiz0gi";
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      // await setCoverUrl(data.url);
      const spinner = await setLoading(true);
      await addCover({
        variables: {
          cover: data.url,
        },
      });

      await setTimeout(() => {
        // setCoverUrl(data.url);
        setCoverImage("");
      }, 1000);
    } catch (err) {
      setErrorCover(err.response.data.error);
    }
  };
  return (
    <div className={classes.profile_cover} ref={coverRef}>
      {coverImage && (
        <div className={classes.save_changes_cover}>
          <div className={classes.save_changes_left}>
            <i>
              <MdOutlinePublic filter="invert(100%)" />
            </i>
            Your cover photo is public.
          </div>
          <div className={classes.save_changes_right}>
            <button className={`blue_btn ${classes.opacity_btn}`}>
              Cancel
            </button>
            <button className={`blue_btn`} onClick={() => updateCoverPicture()}>
              Save changes
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg, image/png, image/webp, image/gif"
        onChange={handleImage}
      />
      {errorCover && (
        <div className={`postError ${classes.coverError}`}>
          <div className={`postError_error`}>{errorCover}</div>
          <button
            className="bluebtn"
            onClick={() => {
              setErrorCover("");
            }}
          >
            Try again
          </button>
        </div>
      )}
      {coverImage && (
        <div className={classes.cover_cropper}>
          <Cropper
            image={coverImage}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && <img src={coverUrl} className={classes.cover} alt="" />}
      {!visitor && (
        <div className={classes.update_cover_wrapper}>
          <div
            className={`${classes.open_cover_update} hover1`}
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i>
              <BsFillCameraFill />
            </i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className={classes.open_cover_menu} ref={menuRef}>
              <div
                className={`${classes.open_cover_menu_item} hover1`}
                onClick={() => refInput.current.click()}
              >
                <BsFillFileImageFill />
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cover;
