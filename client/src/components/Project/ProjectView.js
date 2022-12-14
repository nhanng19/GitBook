import React from "react";
import Kanban from "../Kanban/Kanban";

const ProjectView = ({ name, description, date, owner,repo }) => {
  const DUMMY_DESCRIPTION = `project description test, dummy description.`;
  return (
    <>
      <Kanban name={name} description={description} date={date} owner={owner} repo={repo} />
    </>
  );
};

export default ProjectView;
