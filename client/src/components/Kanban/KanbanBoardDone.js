import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardDone = ({ project }) => {
  const done = project.done;
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>Done</div>
      <div>
        {done.length !== 0 &&
          done.map((task) => (
            <KanbanItem
              project={project}
              key={task._id}
              section="Done"
              kanbanId={task._id}
              assignee={task.assignee}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoardDone;
