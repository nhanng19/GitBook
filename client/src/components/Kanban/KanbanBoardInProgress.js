import React from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardInProgress = (props) => {
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>In-Progress</div>
      <div>
        {props.tasks.length !== 0 &&
          props.tasks.map((task) => (
            <KanbanItem
              key={task.id}
              section="In-Progress"
              assigner={task.assignee}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoardInProgress;
