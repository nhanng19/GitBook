import React from "react";
import classes from "./KanbanItem.module.css";
import { FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const KanbanItem = (props) => {
  let section;
  if (props.section === "To-Do") {
    section = [<FaTrashAlt size="2rem" />, <FaArrowRight size="2rem" />];
  } else if (props.section === "In-Progress") {
    section = [<FaArrowLeft size="2rem" />, <FaArrowRight size="2rem" />];
  } else {
    section = [<FaArrowLeft size="2rem" />, <FaTrashAlt size="2rem" />];
  }
  return (
    <div className={classes.kanbanItem}>
      <div className={classes.itemHeader}>
        <h3 className={classes.itemAssigner}>{props.assigner}</h3>
        <button className={classes.btn}>
          <svg className={classes.icon}>{section[0]}</svg>
        </button>
        <button className={classes.btn}>
          <svg className={classes.icon}>{section[1]}</svg>
        </button>
      </div>
      <p className={classes.itemDescription}>{props.description}</p>
    </div>
  );
};

export default KanbanItem;
