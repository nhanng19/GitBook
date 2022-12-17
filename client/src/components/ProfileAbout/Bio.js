import React from "react";
import classes from "./Bio.module.css";
import { MdOutlinePublic } from "react-icons/md";

const Bio = ({ infos, handleBioChange, max, setShowBio, updateDetails }) => {
  return (
    <div className={classes.add_bio_wrap}>
      <textarea
        placeholder="Add bio"
        name="bio"
        value={infos?.bio}
        maxLength="100"
        className={`textarea_blue details_input`}
        onChange={handleBioChange}
      ></textarea>
      <div className="remaining">{max} characters remaining</div>
      <div className="flex">
        <div className="flex flex-right">
          <div className="gray_btn hover1" onClick={() => setShowBio(false)}>
            Cancel
          </div>
          <div className="blue_btn hover1" onClick={() => updateDetails()}>Save</div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
