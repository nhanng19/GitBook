import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectList from "../Project/ProjectList";
import AddProject from "../Project/AddProject";
import classes from "./ProfileProjects.module.css";

const ProfileProjects = () => {
  const outletCtx = useOutletContext();
  const [visibleModal, setVisibleModal] = useState(false);
  const visitor = outletCtx[2];

  return (
    <>
      <div className={classes.container}>
        <ProjectList
          projects={outletCtx[3]}
          title={outletCtx[1]}
          showUsername={false}
        />
      </div>
    </>
  );
};

export default ProfileProjects;
