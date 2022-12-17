import React, { useEffect, useState } from "react";
import classes from "./ProfileAbout.module.css";
import { MdOutlineWork } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import {HiHome} from 'react-icons/hi';
import Bio from "./Bio";
import { useMutation } from "@apollo/client";
import { EDIT_DETAILS } from "../../utils/mutations";


const ProfileAbout = ({ details, username, visitor }) => {
  const [editDetails, { error }] = useMutation(EDIT_DETAILS);

  const initial = {
    bio: details?.bio ? details.bio : "this is my bio",
    job: details?.job ? details.job : "test",
    highSchool: details?.highSchool ? details.highSchool : "highschool",
    college: details?.college ? details.college : "somecollege",
    currentCity: details?.currentCity ? details.currentCity : "Anaheim",
    gender: details?.gender ? details.gender : "Male",
    bYear: details?.bYear ? details.bYear : 1994,
    bMonth: details?.bMonth ? details.bMonth : 2,
    bDay: details?.bDay ? details.bDay : 4,
    github: details?.github ? details.github : "YichanYou",
    linkedin: details?.linkedin ? details.linkedin : "Linkedin",
    instagram: details?.instagram ? details.instagram : "instagram",
  };
  const [infos, setInfos] = useState(initial);
  const  [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const handleBioChange = (e) => {
    setInfos({ ...infos, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };
  const updateDetails = async () => {
    try {
      console.log(infos);
      await editDetails({
        variables: {
          details: infos,
        },
      });
      setShowBio(false);
    } catch (err) {
      console.log(err);
    }
  }
useEffect(() => {
  setInfos(infos);
}, [infos]);
  return (
    <div className={classes.profile_card}>
      <div className={classes.profile_card_header}>About {username}</div>
      {infos.bio && !showBio && (
        <div className={classes.info_col}>
          <span className={classes.info_text}>{infos.bio}</span>
          {!visitor && <button className="gray_btn hover1" onClick={() => setShowBio(true)}>Edit Bio</button>}
        </div>
      )}
      {showBio && <Bio infos={infos} handleBioChange={handleBioChange} updateDetails={updateDetails} setShowBio={setShowBio} max={max} />}
      {infos.job && (
        <div className={classes.info_profile}>
          <MdOutlineWork />
          Work as {infos.job}
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
          
          Lives in {infos.currentCity}
        </div>
      )}
      {!visitor && <button className="gray_btn hover1 w100">Edit Details</button>}
    </div>
  );
};

export default ProfileAbout;
