import React, { useState } from "react";
import KanbanForm from "./KanbanForm";
import classes from "./KanbanNewTask.module.css";

const KanbanNewTask = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const saveTaskDataHandler = (enteredTaskData) => {
    const taskData = {
      ...enteredTaskData,
      id: Math.random().toString(),
    };
    props.onAddTask(taskData);
    setIsAdding(false);
  };

  const startAddingHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  return (
    <div className={classes.new_task}>
        {!isAdding && <button onClick={startAddingHandler}>Add New Task</button>}
        {isAdding && <KanbanForm onSaveTaskData={saveTaskDataHandler} onCancel = {stopAddingHandler} />}
    </div>
  );
};

export default KanbanNewTask;
