import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import classes from "./ProfileAbout.module.css";
import { MdOutlineWork } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import Bio from "./Bio";
import { useMutation } from "@apollo/client";
import { EDIT_DETAILS } from "../../utils/mutations";
import EditDetails from "./EditDetails";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";


const ProfileAbout = () => {
  const outletCtx = useOutletContext();

  const [visible, setVisible] = useState(false);
  const [editDetails, { error }] = useMutation(EDIT_DETAILS);
const details = outletCtx[0][0];
const username = outletCtx[0][1];
const visitor = outletCtx[0][2];
console.log(details);
  const initial = {
    bio: details?.bio ? details.bio : "",
    job: details?.job ? details.job : "",
    workPlace: details?.workPlace ? details.workPlace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    gender: details?.gender ? details.gender : "",
    bYear: details?.bYear ? details.bYear : "",
    bMonth: details?.bMonth ? details.bMonth : "",
    bDay: details?.bDay ? details.bDay : "",
    github: details?.github ? details.github : "",
    linkedin: details?.linkedin ? details.linkedin : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const updateDetails = async () => {
    try {
      
      await editDetails({
        variables: {
          bio: infos.bio,
          job: infos.job,
          workPlace: infos.workPlace,
          highSchool: infos.highSchool,
          college: infos.college,
          currentCity: infos.currentCity,
          gender: infos.gender,
          bYear: infos.bYear,
          bMonth: infos.bMonth,
          bDay: infos.bDay,
          github: infos.github,
          linkedin: infos.linkedin,
          instagram: infos.instagram,
        },
      });
      setShowBio(false);
      console.log(infos.workPlace)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setInfos(infos);
  }, [infos]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };
  return (
    <div className={classes.profile_card}>
      <div className={classes.profile_card_header}>About {username}</div>
      {infos.bio && !showBio && (
        <div className={classes.info_col}>
          <span className={classes.info_text}>{infos.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {showBio && (
        <Bio
          infos={infos}
          handleChange={handleChange}
          updateDetails={updateDetails}
          setShowBio={setShowBio}
          inputValue={infos?.bio}
          max={max}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {infos.job && (
        <div className={classes.info_profile}>
          <MdOutlineWork />
          Work as {infos.job} at {infos.workPlace}
        </div>
      )}
      {infos?.college && (
        <div className={classes.info_profile}>
          <IoMdSchool />
          Studied at {infos.college}
        </div>
      )}
      {infos?.highSchool && (
        <div className={classes.info_profile}>
          <IoMdSchool />
          Studied at {infos.highSchool}
        </div>
      )}
      {infos?.currentCity && (
        <div className={classes.info_profile}>
          <HiHome />
          Lives in {infos.currentCity}
        </div>
      )}
      {infos?.github && (
        <div className={classes.info_profile}>
          <BsGithub />
          Github account: <a href={`github.com/${infos.github}`}>{infos.github}</a>
        </div>
      )}
      {infos?.linkedin && (
        <div className={classes.info_profile}>
          <BsLinkedin />
          Visit my <a href={infos.linkedin}>Linkedin</a>
        </div>
      )}
      {infos?.instagram && (
        <div className={classes.info_profile}>
          <BsInstagram />
          Visit my <a href={`instagram.com/${infos.instagram}`}>@{infos.instagram}</a>
        </div>
      )}
      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {visible && !visitor && (
        <EditDetails
          username={username}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default ProfileAbout;
