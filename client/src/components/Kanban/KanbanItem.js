import React from "react";
import classes from "./KanbanItem.module.css";
import { FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import IconBtn from "../UI/IconBtn";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
const KanbanItem = (props) => {
  let section;
  if (props.section === "To-Do") {
    section = [
      <FaTrashAlt onClick={props.onRemove} size="2rem" />,
      <FaChevronCircleRight onClick={props.onMoveForward} size="2rem" />,
    ];
  } else if (props.section === "In-Progress") {
    section = [
      <FaChevronCircleLeft onClick={props.onMovePrevious} size="2rem" />,
      <FaChevronCircleRight onClick={props.onMoveForward} size="2rem" />,
    ];
  } else {
    section = [
      <FaChevronCircleLeft onClick={props.onMovePrevious} size="2rem" />,
      <FaTrashAlt onClick={props.onRemove} size="2rem" />,
    ];
  }
  return (
    <div className={classes.kanbanItem}>
      <div className={classes.itemHeader}>
        <h3 className={classes.itemAssigner}>{props.assigner}</h3>
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
