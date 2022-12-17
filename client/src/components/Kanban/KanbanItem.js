import React from "react";
import classes from "./KanbanItem.module.css";
import {
  FaTrashAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import {
  REMOVE_TICKET,
  TODO_PROGRESS,
  PROGRESS_DONE,
  REMOVE_PROGRESS,
  REMOVE_DONE,
  DONE_PROGRESS,
  PROGRESS_TODO,
} from "../../utils/mutations";
import { useMutation } from "@apollo/client";
const KanbanItem = (props) => {
  
  const [removeTicket] = useMutation(REMOVE_TICKET);
  const [todoProgress] = useMutation(TODO_PROGRESS);
  const [progressDone] = useMutation(PROGRESS_DONE);
  const [removeProgress] = useMutation(REMOVE_PROGRESS);
  const [removeDone] = useMutation(REMOVE_DONE);
  const [doneProgress] = useMutation(DONE_PROGRESS);
  const [progressTodo] = useMutation(PROGRESS_TODO);
  
  const handleRemoveTicket = async () => {
    try {
      await removeTicket({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoProgress = async () => {
    try {
      await removeTicket({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
      await todoProgress({
        variables: {
          projectId: props.project._id,
          assignee: props.assignee,
          description: props.description,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressDone = async () => {
    try {
      await removeProgress({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
      await progressDone({
        variables: {
          projectId: props.project._id,
          assignee: props.assignee,
          description: props.description,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveDone = async () => {
    try {
      await removeDone({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDoneProgress = async () => {
    try {
      await removeDone({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
      await doneProgress({
        variables: {
          projectId: props.project._id,
          assignee: props.assignee,
          description: props.description,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgressTodo = async () => {
    try {
      await removeProgress({
        variables: {
          projectId: props.project._id,
          kanbanId: props.kanbanId,
        },
      });
      await progressTodo({
        variables: {
          projectId: props.project._id,
          assignee: props.assignee,
          description: props.description,
          kanbanId: props.kanbanId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  let section;
  
  if (props.section === "To-Do") {
    section = [
      <FaTrashAlt onClick={handleRemoveTicket} size="2rem" />,
      <FaChevronCircleRight onClick={handleTodoProgress} size="2rem" />,
    ];
  } else if (props.section === "In-Progress") {
    section = [
      <FaChevronCircleLeft onClick={handleProgressTodo} size="2rem" />,
      <FaChevronCircleRight onClick={handleProgressDone} size="2rem" />,
    ];
  } else {
    section = [
      <FaChevronCircleLeft onClick={handleDoneProgress} size="2rem" />,
      <FaTrashAlt onClick={handleRemoveDone} size="2rem" />,
    ];
  }
  return (
    <div
      data-aos="flip-up"
      data-aos-duration="10"
      className={classes.kanbanItem}
    >
      <div className={classes.itemHeader}>
        <h3 className={classes.itemAssigner}>{props.assignee}</h3>
        <div className={classes.itemButton}>
          {section[0]}
          {section[1]}
        </div>
      </div>
      <p className={classes.itemDescription}>{props.description}</p>
    </div>
  );
};

export default KanbanItem;
