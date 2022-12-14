import React, { useState, useContext } from "react";
import KanbanForm from "./KanbanForm";
import classes from "./KanbanNewTask.module.css";
import KanbanContext from "../../store/kanban-context";
import ProjectInfo from "../Project/ProjectInfo";
const KanbanNewTask = ({ name, date, description, owner, repo, props }) => {
  const kanbanCtx = useContext(KanbanContext);

  const [isAdding, setIsAdding] = useState(false);
  const saveTaskDataHandler = (enteredTaskData) => {
    kanbanCtx.addTask({
      id: `${enteredTaskData.assignee}${Math.floor(Math.random() * 100000000)}`,
      assignee: enteredTaskData.assignee,
      description: enteredTaskData.description,
    });
    // const taskData = {
    //   ...enteredTaskData,
    //   id: Math.random().toString(),
    // };
    // props.onAddTask(taskData);
    // setIsAdding(false);
  };

  const startAddingHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.new_task}>
      <div className={classes.left}>
        {" "}
        <ProjectInfo
          title={name}
          date={date}
          description={description}
          owner={owner}
          repo={repo}
        />
      </div>

      <div className={classes.right}>

          <KanbanForm
            onSaveTaskData={saveTaskDataHandler}
            onCancel={stopAddingHandler}
          />
   
      </div>
    </div>
  );
};

export default KanbanNewTask;
