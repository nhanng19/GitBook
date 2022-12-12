import React from "react";
import { FaTasks } from "react-icons/fa";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardDone = (props) => {
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>Done</div>
      <div>
      {props.tasks.length !== 0 &&
          props.tasks.map((task) => (
            <KanbanItem
              key={task.id}
              section="Done"
              assigner={task.assignee}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoardDone;
