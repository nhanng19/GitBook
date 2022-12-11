import React from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardToDo = () => {
  const dummy_description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et
  malesuada fames ac turpis egestas integer eget. Sit amet facilisis
  magna etiam`

  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>To-Do</div>
      <div>
        <KanbanItem section="To-Do" assigner="Richard" description="testing" />
        <KanbanItem section="To-Do" assigner="Richard" description={dummy_description} />        
      </div>
    </div>
  );
};

export default KanbanBoardToDo;
