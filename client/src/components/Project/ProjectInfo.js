import React from "react";
import classes from "./ProjectInfo.module.css";
import { FaGithub } from "react-icons/fa";
const ProjectInfo = (props) => {
  return (
    <>
      <div className={classes.container}>
        <a
          className={classes.git}
          target="_blank"
          rel="noreferrer"
          href={props.repo}
        >
          <FaGithub />
        </a>
        <h3 className={classes.projectTitle}>/{props.title}</h3>

        <h4 className={classes.projectDescription}>{props.description}</h4>
        <p className={classes.projectDate}>
          Created {props.date} by {props.owner}
        </p>
      </div>
    </>
  );
};

export default ProjectInfo;
