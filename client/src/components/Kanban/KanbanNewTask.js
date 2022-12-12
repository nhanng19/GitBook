import React, { useState, useContext } from "react";
import KanbanForm from "./KanbanForm";
import classes from "./KanbanNewTask.module.css";
import KanbanContext from "../../store/kanban-context";

const KanbanNewTask = (props) => {
  const kanbanCtx = useContext(KanbanContext);
   
  const [isAdding, setIsAdding] = useState(false);
  const saveTaskDataHandler = (enteredTaskData) => {
    kanbanCtx.addTask({
      id: `${enteredTaskData.assignee}${Math.floor(Math.random()*100000000)}`,
      assignee: enteredTaskData.assignee,
      description: enteredTaskData.description
    })
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
        {!isAdding && <button onClick={startAddingHandler}>Add New Task</button>}
        {isAdding && <KanbanForm onSaveTaskData={saveTaskDataHandler} onCancel = {stopAddingHandler} />}
    </div>
  );
};

export default KanbanNewTask;
