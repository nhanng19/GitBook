import React, { useState } from "react";
import classes from "./KanbanForm.module.css";

const KanbanForm = (props) => {
  const [enteredAssignee, setEnteredAssignee] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const assigneeChangeHandler = (event) => {
    setEnteredAssignee(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const taskData = {
      assignee: enteredAssignee,
      description: enteredDescription,
    };

    props.onSaveTaskData(taskData);
    setEnteredAssignee("");
    setEnteredDescription("");
  };

  return (
    <form onSubmit={submitHandler} className={classes.toDoForm}>
      <div className={classes.inputHeader}>
        <label className={classes.formLabel}>To-do list:</label>
        <input
          className={classes.formInput}
          type="text"
          value={enteredDescription}
          onChange={descriptionChangeHandler}
        ></input>
      </div>
      <div className={classes.inputBody}>
        <label className={classes.formLabel}>Assigners:</label>
        <input
          type="text"
          value={enteredAssignee}
          onChange={assigneeChangeHandler}
          className={classes.formInput}
        ></input>
        <button className={classes.addBtn}>Add</button>
      </div>
    </form>
  );
};

export default KanbanForm;
