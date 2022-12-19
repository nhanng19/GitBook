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
        {projects &&
          [...projects]
            .sort((a, b) => b.toDo.length - a.toDo.length)
            .map((project) => (
              <div
                data-aos="flip-up" data-aos-offset="-100"
                key={Math.floor(100000 + Math.random() * 900000)}
                className={styles.card}
              >
                <h3>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/projects/${project._id}`}
                  >
                    /{project.projectName}
                  </Link>
                </h3>
                <a
                  className={styles.git}
                  target="_blank"
                  rel="noreferrer"
                  href={project.projectRepo}
                >
                  <FaGithub />
                </a>
                <div className={styles.cutoffText}>
                  {project.projectDescription}
                </div>
                <div>
                  {showUsername ? (
                    <div className={styles.owner}>
                      <Link to={`/profile/${project.projectOwner}/projects`}>
                        {project.projectOwner}
                      </Link>{" "}
                      <br />
                      <span style={{ fontSize: "1rem" }}>
                        {project.createdAt}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span style={{ fontSize: "1.rem" }}>
                        You created on {project.createdAt}
                      </span>
                    </>
                  )}
                </div>
                {project.toDo.length !== 0 && (
                  <span className={styles.badge}>{project.toDo.length}</span>
                )}
              </div>
            ))}
      </div>
    </>
  );
};

export default ProjectList;
