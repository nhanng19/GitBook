import React, { useReducer } from "react";

import KanbanContext from "./kanban-context";

const DUMMY_DATA_TODO = [
  {
    id: "toDok1",
    assignee: "Richard",
    description: "testing description one",
  },
  {
    id: "toDok2",
    assignee: "Fay",
    description: "testing description two",
  },
  {
    id: "toDok3",
    assignee: "RandomGuy",
    description: "testing description three",
  },
];

const DUMMY_DATA_IN_PROGRESS = [
  {
    id: "InProgressk1",
    assignee: "John",
    description: "testing for inprogress kanban board",
  },
];
const DUMMY_DATA_DONE = [
  {
    id: "Donek1",
    assignee: "John",
    description: "testing for done kanban board",
  },
];

const defaultTaskState = {
  taskToDo: DUMMY_DATA_TODO,
  taskInProgress: DUMMY_DATA_IN_PROGRESS,
  taskDone: DUMMY_DATA_DONE,
};

const kanbanReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTasks = state.taskToDo.concat(action.task);
    return {
      taskToDo: updatedTasks,
      taskInProgress: state.taskInProgress,
      taskDone: state.taskDone
    };
  }

  if (action.type === "CANCEL") {
    // const existingTaskIndex = state.taskToDo.findIndex(
    //   (task) => task.id === action.id
    // );
    // const existingTask = state.taskToDo[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskToDo.filter((task) => task.id !== action.id);
    return {
      taskToDo: updatedTasks,
      taskInProgress: state.taskInProgress,
      taskDone: state.taskDone
    };
  }

  if (action.type === "REMOVE") {
    // const existingTaskIndex = state.taskDone.findIndex(
    //   (task) => task.id === action.id
    // );
    // const existingTask = state.taskDone[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskDone.filter((task) => task.id !== action.id);
    return {
      taskToDo: state.taskToDo,
      taskInProgress: state.taskInProgress,
      taskDone: updatedTasks,
    };
  }

  if (action.type === "MOVEAB") {
    const existingTaskIndex = state.taskToDo.findIndex(
      (task) => task.id === action.id
    );
    const existingTask = state.taskToDo[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskToDo.filter((task) => task.id !== action.id);
    const targetTasks = state.taskInProgress.concat(existingTask);
    return {
      taskToDo: updatedTasks,
      taskInProgress: targetTasks,
      taskDone: state.taskDone
    }
  }
  if (action.type === "MOVEBC") {
    const existingTaskIndex = state.taskInProgress.findIndex(
      (task) => task.id === action.id
    );
    const existingTask = state.taskInProgress[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskInProgress.filter((task) => task.id !== action.id);
    const targetTasks = state.taskDone.concat(existingTask);
    return {
      taskToDo: state.taskToDo,
      taskInProgress: updatedTasks,
      taskDone: targetTasks
    }
  }
  if (action.type === "MOVECB") {
    const existingTaskIndex = state.taskDone.findIndex(
      (task) => task.id === action.id
    );
    const existingTask = state.taskDone[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskDone.filter((task) => task.id !== action.id);
    const targetTasks = state.taskInProgress.concat(existingTask);
    return {
      taskToDo: state.taskToDo,
      taskInProgress: targetTasks,
      taskDone: updatedTasks
    }
  }
  if (action.type === "MOVEBA") {
    const existingTaskIndex = state.taskInProgress.findIndex(
      (task) => task.id === action.id
    );
    const existingTask = state.taskInProgress[existingTaskIndex];
    let updatedTasks;
    updatedTasks = state.taskInProgress.filter((task) => task.id !== action.id);
    const targetTasks = state.taskToDo.concat(existingTask);
    return {
      taskToDo: targetTasks,
      taskInProgress: updatedTasks,
      taskDone: state.taskDone
    }
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

  const cancelTaskFromKanbanHandler = (id) => {
    dispatchKanbanAction({ type: "CANCEL", id: id });
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
    cancelTask: cancelTaskFromKanbanHandler,
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
