import React, { useContext } from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";
import KanbanContext from "../../store/kanban-context";

const KanbanBoardDone = (props) => {
  const kanbanCtx = useContext(KanbanContext);

  const doneTasks = kanbanCtx.taskDone;
  const taskMoveToPreviousHandler = (id) => {
    kanbanCtx.moveTaskCB(id);
  };
  const taskRemoveHandler = (id) => {
    kanbanCtx.removeTask(id);
  };

  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>Done</div>
      <div>
        {doneTasks.length !== 0 &&
          doneTasks.map((task) => (
            <KanbanItem
              key={task.id}
              section="Done"
              assigner={task.assignee}
              description={task.description}
              onMovePrevious={taskMoveToPreviousHandler.bind(null, task.id)}
              onRemove={taskRemoveHandler.bind(null, task.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoardDone;
