import React from "react";
import classes from "./ProjectInfo.module.css";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProjectInfo = (props) => {
  return (
    <>
      <div data-aos="fade-in" className={classes.container}>
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
          Created {props.date} by{" "}
          <Link title={props.title} to={`/profile/${props.owner}/projects`}>
            {props.owner}
          </Link>
        </p>
      </div>
    </>
  );
};

export default ProjectInfo;
