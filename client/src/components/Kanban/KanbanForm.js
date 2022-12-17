import React, { useState, useRef } from "react";
import classes from "./KanbanForm.module.css";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_TICKET } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROJECTS } from "../../utils/queries";
import LoadingSpinner from "../UI/LoadingSpinner";
const KanbanForm = ({ projectId }) => {
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
  const [addTicket] = useMutation(ADD_TICKET, {
    update(cache, { data: { addTicket } }) {
      try {
        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: { projects: [addTicket, ...projects] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, projects: [...me.projects, addTicket] } },
      });
    },
  });
  const submitHandler = async (event) => {
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

    if ( enteredAssignee.trim().length !== 0 ||
      enteredDescription.trim().length !== 0
    ){
      setTaskIsValid(true);
    }


    // const taskData = {
    //   assignee: enteredAssignee,
    //   description: enteredDescription,
    // };

    try {
      await addTicket({
        variables: {
          projectId: projectId,
          assignee: enteredAssignee,
          description: enteredDescription,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // assigneeInputRef.current.reset();
  // descriptionInputRef.current.reset();
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form
          data-aos="flip-up"
          ref={formRef}
          onSubmit={submitHandler}
          className={classes.toDoForm}
        >
          <h1>Add a ticket</h1>
          {!taskIsValid && <p>Please enter a valid input.</p>}
          <div className={classes.inputHeader}>
            <input
              ref={descriptionInputRef}
              className={classes.formInput}
              type="text"
              placeholder="Enter Ticket"
              autoFocus
              // value={enteredDescription}
              // onChange={descriptionChangeHandler}
            ></input>
          </div>
          <div className={classes.inputBody}>
            <select
              ref={assigneeInputRef}
              className={classes.selectInput}
              name="cars"
              defaultValue={"Choose an assignee"}
            >
              <option value="Choose an assignee" disabled>
                Choose an assignee
              </option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
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
