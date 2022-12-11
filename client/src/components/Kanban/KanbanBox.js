import React from "react";
import classes from "./KanbanBox.module.css";
import KanbanBoardToDo from "./KanbanBoardToDo";
import KanbanBoardInProgress from "./KanbanBoardInProgress";
import KanbanBoardDone from "./KanbanBoardDone";

const KanbanBox = () => {
  return (
    <div className={classes.kanbanBox}>
      <KanbanBoardToDo />
      <KanbanBoardInProgress />
      <KanbanBoardDone />      
    </div>
  );
};

export default KanbanBox;
