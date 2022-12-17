import React from "react";
import classes from "./Bio.module.css";

const Bio = ({
  infos,
  inputValue,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  placeholder,
  name,
  detail,
  setShow,
}) => {
  return (
    <div className={classes.add_bio_wrap}>
      <textarea
        placeholder={placeholder}
        name={name}
        value={inputValue}
        maxLength="100"
        className={`textarea_blue details_input`}
        onChange={handleChange}
      ></textarea>
      {!detail && <div className="remaining">{max} characters remaining</div>}
      <div className="flex">
        <div className="flex flex-right">
          <div
            className="gray_btn hover1"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </div>
          <div
            className="blue_btn hover1"
            onClick={() => {
              updateDetails();
              setShow(false);
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
