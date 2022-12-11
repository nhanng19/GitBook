import React from "react";
import classes from './ProjectInfo.module.css';

const ProjectInfo = (props) => {
  return (
    <>
      <div>
        <h1 className={classes.projectTitle}>{props.title}</h1>
        <p className={classes.projectDate}>{props.date}</p>
      </div>
      <h4 className={classes.projectDescription}>
        {props.description}
      </h4>
    </>
  );
};

export default ProjectInfo;
