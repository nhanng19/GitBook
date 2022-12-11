import React from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardDone = () => {
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>Done</div>
      <div>
        <KanbanItem section="Done" assigner="Richard" description="testing" />
      </div>
    </div>
  );
};

export default KanbanBoardDone;
