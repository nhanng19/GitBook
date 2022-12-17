import React, { useState } from "react";
import classes from "./ProfileAbout.module.css";
import { BsFillPencilFill, BsPerson, BsPlusCircle } from "react-icons/bs";
import Bio from "./Bio";
import { MdOutlineWork } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import {
  BsPersonFill,
  BsCalendarDate,
  BsGithub,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";

const Detail = ({
  header,
  icon,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  inputValue,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const iconItem = () => {
    switch (icon) {
      case "study":
        return <IoMdSchool />;
        break;
      case "home":
        return <HiHome />;
        break;
      case "work":
        return <MdOutlineWork />;
        break;
      case "gender":
        return <BsPersonFill />;
        break;
      case "date":
        return <BsCalendarDate />;
        break;
      case "github":
        return <BsGithub />;
        break;
      case "linkedin":
        return <BsLinkedin />;
        break;
      case "instagram":
        return <BsInstagram />;
        break;
      default:
        return null;
    }
  };

  return (
    <>
      
      <div
        className={`${classes.add_details_flex}`}
        onClick={() => setShowEdit(true)}
      >
        {value ? (
          <div className={`${classes.info_profile} `}>
            {iconItem}
            {value}
            <BsFillPencilFill position="absolute" />
          </div>
        ) : (
          <>
            <BsPlusCircle />
            <span className={classes.no_underline}>Add {header}</span> 
          </>
        )}
      </div>
      {showEdit && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          inputValue={inputValue}
          setShow={setShowEdit}
        />
      )}
    </>
  );
};

export default Detail;
