import React, { useContext } from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";
import KanbanContext from "../../store/kanban-context";

const KanbanBoardInProgress = (props) => {
  const kanbanCtx = useContext(KanbanContext);

  const inProgressTasks = kanbanCtx.taskInProgress;
  const taskMoveToPreviousHandler = (id) => {
    kanbanCtx.moveTaskBA(id);
  };
  const taskMoveToProgressHandler = (id) => {
    kanbanCtx.moveTaskBC(id);
  };
console.log(inProgressTasks)
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>In-Progress</div>
      <div>
        {inProgressTasks.length !== 0 &&
          inProgressTasks.map((task) => (
            <KanbanItem
              key={task.id}
              section="In-Progress"
              assigner={task.assignee}
              description={task.description}
              onMovePrevious={taskMoveToPreviousHandler.bind(null, task.id)}
              onMoveForward={taskMoveToProgressHandler.bind(null, task.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoardInProgress;
