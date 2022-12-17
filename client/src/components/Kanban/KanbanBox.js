import React from "react";
import classes from "./KanbanBox.module.css";
import KanbanBoardToDo from "./KanbanBoardToDo";
import KanbanBoardInProgress from "./KanbanBoardInProgress";
import KanbanBoardDone from "./KanbanBoardDone";

const KanbanBox = ({ project }) => {
  return (
    <div data-aos = "fade-in" data-aos-delay="100"className={classes.kanbanBox}>
      <KanbanBoardToDo project={project} />
      <KanbanBoardInProgress project={project} />
      <KanbanBoardDone project={project} />
    </div>
  );
};

export default KanbanBox;
