import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";
import styles from "./AddProject.module.css";
import Auth from "../../utils/auth";

const AddProject = ({ setVisibleModal }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectRepo, setProjectRepo] = useState("");

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: { projects: [addProject, ...projects] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, projects: [...me.projects, addProject] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProject({
        variables: {
          projectName,
          projectDescription,
          projectRepo,
          projectOwner: Auth.getProfile().data.username,
        },
      });

      setProjectName("");
      setProjectDescription("");
      setProjectRepo("");
      setVisibleModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setProjectName(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setProjectDescription(value);
  };

  const handleRepoChange = (event) => {
    const value = event.target.value;
    setProjectRepo(value);
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className={styles.container}>
            <form className={styles.contact} onSubmit={handleFormSubmit}>
              <h3>Add a new project</h3>
              <h4>New projects have Kanban boards and chat rooms!</h4>
              <fieldset>
                <input
                  placeholder="Enter project name"
                  type="text"
                  tabindex="1"
                  name="projectName"
                  value={projectName}
                  onChange={handleNameChange}
                  required
                  autofocus
                />
              </fieldset>
              <fieldset>
                <input
                  placeholder="Enter project link"
                  type="text"
                  tabindex="2"
                  name="projectRepo"
                  value={projectRepo}
                  onChange={handleRepoChange}
                  required
                />
              </fieldset>

              <fieldset>
                <textarea
                  placeholder="Enter project description"
                  type="text"
                  tabindex="5"
                  name="projectDescription"
                  value={projectDescription}
                  onChange={handleDescriptionChange}
                  required
                ></textarea>
              </fieldset>
              <fieldset>
                <button name="submit" type="submit" data-submit="...Sending">
                  Create Project
                </button>
              </fieldset>
            </form>
          </div>

          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <p>You need to be logged in to share your projects.</p>
      )}
    </div>
  );
};

export default AddProject;
