import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardInProgress = ({ project }) => {
  const inProgress = project.inProgress;
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>In-Progress</div>
      <div>
        {inProgress.length !== 0 && (
          inProgress.map((task) => (
            <KanbanItem
              project={project}
              key={task._id}
              section="In-Progress"
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

export default KanbanBoardInProgress;
