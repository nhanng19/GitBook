import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectList.module.css";
import { FaGithub } from "react-icons/fa";
const ProjectList = ({ projects, title, showUsername = true }) => {
  return (
    <>
      <div className={styles.header}>
        <h2>{title}'s projects</h2>
      </div>
      <div className={styles.cardFrame}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className={styles.card}>
              <h3>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/projects/${project._id}`}
                >
                  {project.projectName}
                </Link>
              </h3>
              <a
                className={styles.git}
                target="_blank"
                href={project.projectRepo}
              >
                <FaGithub />
              </a>
              <div className={styles.cutoffText}>
                {project.projectDescription}
              </div>
              <div>
                {showUsername ? (
                  <Link to={`/profiles/${project.projectOwner}`}>
                    {project.projectOwner} <br />
                    <span style={{ fontSize: "1rem" }}>
                      created on {project.createdAt}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: "1.em" }}>
                      You created on {project.createdAt}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No projects found!</p>
        )}
      </div>
    </>
  );
};

export default ProjectList;