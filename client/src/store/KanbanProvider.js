import React, { useReducer } from "react";

import KanbanContext from "./kanban-context";

const defaultTaskState = {
  taskToDo: [],
  taskInProgress: [],
  taskDone: [],
};

const kanbanReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTasks = state.taskToDo.concat(action.task);
    return {
      taskToDo: updatedTasks,
    };
  }

  if (action.type === "REMOVE") {
  }

  if (action.type === "MOVEAB") {
  }
  if (action.type === "MOVEBC") {
  }
  if (action.type === "MOVECB") {
  }
  if (action.type === "MOVEBA") {
  }

  return defaultTaskState;
};

const KanbanProvider = (props) => {
  const [kanbanState, dispatchKanbanAction] = useReducer(
    kanbanReducer,
    defaultTaskState
  );

  const addTaskToKanbanHandler = (task) => {
    dispatchKanbanAction({ type: "ADD", task: task });
  };

  const removeTaskFromKanbanHandler = (id) => {
    dispatchKanbanAction({ type: "REMOVE", id: id });
  };

  const moveTaskFromAToBHandler = (id) => {
    dispatchKanbanAction({ type: "MOVEAB", id: id });
  };

  const moveTaskFromBToCHandler = (id) => {
    dispatchKanbanAction({ type: "MOVEBC", id: id });
  };

  const moveTaskFromCToBHandler = (id) => {
    dispatchKanbanAction({ type: "MOVECB", id: id });
  };

  const moveTaskFromBToAHandler = (id) => {
    dispatchKanbanAction({ type: "MOVEBA", id: id });
  };

  const kanbanContext = {
    taskToDo: kanbanState.taskToDo,
    taskInProgress: kanbanState.taskInProgress,
    taskDone: kanbanState.taskDone,
    addTask: addTaskToKanbanHandler,
    removeTask: removeTaskFromKanbanHandler,
    moveTaskAB: moveTaskFromAToBHandler,
    moveTaskBC: moveTaskFromBToCHandler,
    moveTaskCB: moveTaskFromCToBHandler,
    moveTaskBA: moveTaskFromBToAHandler,
  };

  return (
    <KanbanContext.Provider value={kanbanContext}>
      {props.children}
    </KanbanContext.Provider>
  );
};

export default KanbanProvider;
