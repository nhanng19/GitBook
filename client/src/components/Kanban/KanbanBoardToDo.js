import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardToDo = ({ project }) => {
  const todo = project.toDo;

  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>To-Do</div>
      <div>
        {todo.length !== 0 && (
          todo.map((task) => (
            <KanbanItem
              project={project}
              key={task._id}
              section="To-Do"
              kanbanId={task._id}
              assignee={task.assignee}
              description={task.description}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default KanbanBoardToDo;
