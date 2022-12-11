import React from "react";
import classes from "./KanbanBox.module.css";
import KanbanBoardToDo from "./KanbanBoardToDo";
import KanbanBoardInProgress from "./KanbanBoardInProgress";
import KanbanBoardDone from "./KanbanBoardDone";

const KanbanBox = (props) => {
  return (
    <div className={classes.kanbanBox}>
      <KanbanBoardToDo tasks={props.tasksTodo} />
      <KanbanBoardInProgress />
      <KanbanBoardDone />      
    </div>
  );
};

export default KanbanBox;
