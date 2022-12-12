import React from "react";
import classes from "./KanbanBoard.module.css";
import KanbanItem from "./KanbanItem";

const KanbanBoardInProgress = () => {
    const dummy_description = `Testing adsfasdghajshdfjadasfhk testubgajkshdgakjshgdlkjasdghklj
    asdgagds`
  return (
    <div className={classes.kanban}>
      <div className={classes.kanbanHeader}>In-Progress</div>
      <div>
        <KanbanItem
          section="In-Progress"
          assigner="Richard"
          description={dummy_description}
        />
      </div>
    </div>
  );
};

export default KanbanBoardInProgress;
