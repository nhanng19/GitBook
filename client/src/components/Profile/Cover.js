import React, { useRef, useState } from "react";
import classes from "./Cover.module.css";
import { BsFillCameraFill, BsFillFileImageFill } from "react-icons/bs";
import useClickOutside from "../../helpers/useClickOutside";

const Cover = ({ cover }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));

  //   const profileCover = null;

  return (
    <div className={classes.profile_cover}>
      {cover && (
        <img src={cover} className={classes.cover} alt="" />
      )}

      <div className={classes.update_cover_wrapper}>
        <div
          className={classes.open_cover_update}
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i>
            <BsFillCameraFill />
          </i>
          Add Cover Photo
        </div>
        {showCoverMenu && (
          <div className={classes.open_cover_menu} ref={menuRef}>
            <div className={classes.open_cover_menu_item}>
              <BsFillFileImageFill />
              Upload Photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;
