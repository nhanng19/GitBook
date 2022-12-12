import React, { useState, useRef, useEffect } from "react";
import classes from "./KanbanForm.module.css";

const KanbanForm = (props) => {
  const [taskIsValid, setTaskIsValid] = useState(true);

  const assigneeInputRef = useRef();
  const descriptionInputRef = useRef();
  // const [enteredAssignee, setEnteredAssignee] = useState("");
  // const [enteredDescription, setEnteredDescription] = useState("");

  // const assigneeChangeHandler = (event) => {
  //   setEnteredAssignee(event.target.value);
  // };

  // const descriptionChangeHandler = (event) => {
  //   setEnteredDescription(event.target.value);
  // };

  //useEffect for validity

  // useEffect(() => {
  //   if (
  //     assigneeInputRef.trim().length === 0 ||
  //     descriptionInputRef.trim().length === 0
  //   ) {
  //     setTaskIsValid(false);
  //   }
  // }, [assigneeInputRef, descriptionInputRef]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAssignee = assigneeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (
      enteredAssignee.trim().length === 0 ||
      enteredDescription.trim().length === 0
    ) {
      setTaskIsValid(false);
      return;
    }

    const taskData = {
      assignee: enteredAssignee,
      description: enteredDescription,
    };

    props.onSaveTaskData(taskData);
    // setEnteredAssignee("");
    // setEnteredDescription("");
  };

  return (
    <form onSubmit={submitHandler} className={classes.toDoForm}>
      <div className={classes.inputHeader}>
        <label className={classes.formLabel}>To-do list:</label>
        <input
          ref={descriptionInputRef}
          className={classes.formInput}
          type="text"
          // value={enteredDescription}
          // onChange={descriptionChangeHandler}
        ></input>
      </div>
      <div className={classes.inputBody}>
        <label className={classes.formLabel}>Assigners:</label>
        <input
          ref={assigneeInputRef}
          type="text"
          // value={enteredAssignee}
          // onChange={assigneeChangeHandler}
          className={classes.formInput}
        ></input>
        <button className={classes.addBtn}>Add</button>
      </div>
      {!taskIsValid && <p>Please enter a valid input.</p>}
    </form>
  );
};

export default KanbanForm;
