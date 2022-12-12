import React from "react";
import classes from "./KanbanItem.module.css";
import { FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import IconBtn from "../UI/IconBtn";

const KanbanItem = (props) => {
  let section;
  if (props.section === "To-Do") {
    section = [
      <IconBtn>
        <FaTrashAlt size="2rem" />
      </IconBtn>,
      <IconBtn>
        <FaArrowRight size="2rem" />
      </IconBtn>,
    ];
  } else if (props.section === "In-Progress") {
    section = [
      <IconBtn>
        <FaArrowLeft size="2rem" />
      </IconBtn>,
      <IconBtn>
        <FaArrowRight size="2rem" />
      </IconBtn>,
    ];
  } else {
    section = [
      <IconBtn>
        <FaArrowLeft size="2rem" />
      </IconBtn>,
      <IconBtn>
        <FaTrashAlt size="2rem" />
      </IconBtn>,
    ];
  }
  return (
    <div className={classes.kanbanItem}>
      <div className={classes.itemHeader}>
        <h3 className={classes.itemAssigner}>{props.assigner}</h3>
        {section[0]}
        {section[1]}
      </div>
      <p className={classes.itemDescription}>{props.description}</p>
    </div>
  );
};

export default KanbanItem;
