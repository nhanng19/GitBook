import React, { useState, useRef } from "react";
import classes from "./KanbanForm.module.css";

const KanbanForm = (props) => {
  const [taskIsValid, setTaskIsValid] = useState(true);

  const assigneeInputRef = useRef();
  const descriptionInputRef = useRef();

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
        <input
          ref={descriptionInputRef}
          className={classes.formInput}
          type="text"
          placeholder="Enter Ticket"
          autofocus
          // value={enteredDescription}
          // onChange={descriptionChangeHandler}
        ></input>
      </div>
      <div className={classes.inputBody}>
        <input
          ref={assigneeInputRef}
          type="text"
          placeholder="Enter Assignee"
          // value={enteredAssignee}
          // onChange={assigneeChangeHandler}
          className={classes.formInput}
        ></input>
      </div>{" "}
      {!taskIsValid && <p>Please enter a valid input.</p>}
      <button className={classes.addBtn}>Add</button>
    </form>
  );
};

export default KanbanForm;
