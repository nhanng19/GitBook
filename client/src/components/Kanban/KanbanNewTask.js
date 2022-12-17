import KanbanForm from "./KanbanForm";
import classes from "./KanbanNewTask.module.css";
import ProjectInfo from "../Project/ProjectInfo";
const KanbanNewTask = ({ name, date, description, owner, repo, projectId }) => {

  return (
    <div className={classes.new_task}>
      <div className={classes.left}>
        <ProjectInfo
          title={name}
          date={date}
          description={description}
          owner={owner}
          repo={repo}
        />
      </div>

      <div className={classes.right}>
        <KanbanForm projectId={projectId} />
      </div>
    </div>
  );
};

export default KanbanNewTask;
