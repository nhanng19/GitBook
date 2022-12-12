import React, { useContext } from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";
import KanbanContext from "../../store/kanban-context";

const KanbanBoardToDo = (props) => {
  const kanbanCtx = useContext(KanbanContext);

  const todoTasks = kanbanCtx.taskToDo;

  const taskRemoveHandler = (id) => {
    kanbanCtx.cancelTask(id);
  };

  const taskMoveToProgressHandler = (id) => {
    kanbanCtx.moveTaskAB(id);
  };

  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>To-Do</div>
      <div>
        {todoTasks.length !== 0 &&
          todoTasks.map((task) => (
            <KanbanItem
              key={task.id}
              section="To-Do"
              assigner={task.assignee}
              description={task.description}
              onRemove={taskRemoveHandler.bind(null, task.id)}
              onMoveForward={taskMoveToProgressHandler.bind(null, task.id)}
            />
          ))}
      </div>
    </div>
  );
};

//   return (
//     <div className={classes.kanban}>
//       <div className={classes.kanbanHeader}>To-Do</div>
//       <div>
//         {props.tasks.length !== 0 &&
//           props.tasks.map((task) => (
//             <KanbanItem
//               section="To-Do"
//               assigner={task.assignee}
//               description={task.description}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

export default KanbanBoardToDo;