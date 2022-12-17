import React, { useRef } from "react";
import Detail from "./Detail";
import classes from "./EditDetails.module.css";
import { BsX, BsXLg } from "react-icons/bs";
import useClickOutside from '../../helpers/useClickOutside';

const EditDetails = ({
  username,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) => {
  const modal =useRef(null)
  useClickOutside(modal, () => setVisible(false))
  return (
    <div className={`blur`}>
      <div className={`postBox ${classes.infosBox}`} ref={modal}>
        <div className={`box_header`}>
          <div className={`small_circle`} onClick={()=> setVisible(false)}>
            <BsXLg />
          </div>
          <span>Edit Details</span>
        </div>
        <div className={`${classes.details_wrapper} scrollbar`}>
          <div className={classes.details_col}>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>

          <div className={classes.details_header}>Work</div>
          <Detail
            header="Job"
            value={infos?.job}
            icon="work"
            placeholder="Add a job title"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.job}
          />
          <Detail
            header="Work Place"
            value={infos?.workPlace}
            icon="work"
            placeholder="Add a work place"
            name="workPlace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.workPlace}
          />
          <div className={classes.details_header}>Education</div>
          <Detail
            header="high school"
            value={infos?.highSchool}
            icon="study"
            placeholder="Add a high school"
            name="highSchool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.highSchool}
          />
          <Detail
            header="college"
            value={infos?.college}
            icon="study"
            placeholder="Add a college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.college}
          />
          <div className={classes.details_header}>Location</div>
          <Detail
            header="current city"
            value={infos?.currentCity}
            icon="home"
            placeholder="Add a current city"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.currentCity}
          />
          <div className={classes.details_header}>Personal</div>
          {/* gender? */}
          {/* <Detail
          header="current city"
          value={infos?.currentCity}
          icon="home"
          placeholder="Add a current city"
          name="currentCity"
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          inputValue={infos.currentCity}
        /> */}
          {/* birth date */}
          <div className={classes.details_header}>Contact</div>
          <Detail
            header="github"
            value={infos?.github}
            icon="github"
            placeholder="Add a github username"
            name="github"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.github}
          />
          <Detail
            header="linkedin"
            value={infos?.linkedin}
            icon="linkedin"
            placeholder="Add a linkedin url"
            name="linkedin"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.linkedin}
          />
          <Detail
            header="instagram"
            value={infos?.instagram}
            icon="instagram"
            placeholder="Add a instagram account"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            inputValue={infos.instagram}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
