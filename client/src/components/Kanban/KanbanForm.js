import React, { useState, useRef } from "react";
import classes from "./KanbanForm.module.css";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../UI/LoadingSpinner";
const KanbanForm = (props) => {
  const [taskIsValid, setTaskIsValid] = useState(true);
  const formRef = useRef();
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
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

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
    assigneeInputRef.current.reset();
    descriptionInputRef.current.reset();
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form
          ref={formRef}
          onSubmit={submitHandler}
          className={classes.toDoForm}
        >
          <h1>Add a ticket</h1>{" "}
          {!taskIsValid && <p>Please enter a valid input.</p>}
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
            <select
              ref={assigneeInputRef}
              className={classes.selectInput}
              name="cars"
            >
              <option value="" disabled selected>
                Choose an assignee
              </option>
              {users.map((user) => (
                <option value={user.username}>{user.username}</option>
              ))}
            </select>
          </div>
          <button className={classes.addBtn}>Add</button>
        </form>
      )}
    </>
  );
};

export default KanbanForm;
