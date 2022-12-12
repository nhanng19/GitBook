import React, { useState } from "react";
import KanbanProvider from "../../store/KanbanProvider";

import KanbanBox from "./KanbanBox";
import KanbanNewTask from "./KanbanNewTask";

const DUMMY_DATA_TODO = [
  {
    id: "k1",
    assignee: "Richard",
    description: "testing description one",
  },
  {
    id: "k2",
    assignee: "Fay",
    description: "testing description two",
  },
  {
    id: "k3",
    assignee: "RandomGuy",
    description: "testing description three",
  },
];

const DUMMY_DATA_IN_PROGRESS = [
  {
    id: "k1",
    assignee: "John",
    description: "testing for inprogress kanban board",
  },
];
const DUMMY_DATA_DONE = [
  {
    id: "k1",
    assignee: "John",
    description: "testing for done kanban board",
  },
];

const Kanban = () => {
  const [tasksTodo, setTasksTodo] = useState(DUMMY_DATA_TODO);
  const [tasksInProgress, setTasksInProgress] = useState(
    DUMMY_DATA_IN_PROGRESS
  );
  const [tasksDone, setTasksDone] = useState(
    DUMMY_DATA_DONE
  );

  const addTaskTodoHandler = (task) => {
    setTasksTodo((prevTasks) => {
      return [...prevTasks, task];
    });
  };

  const addTaskInProgressHandler = (task) => {
    setTasksInProgress((prevTasks) => {
      return [...prevTasks, task];
    });
  };

  return (
    <KanbanProvider>
      {/* <KanbanForm onAddTask={addTaskHandler} /> */}
      <KanbanNewTask onAddTask={addTaskTodoHandler} />
      <KanbanBox
        tasksTodo={tasksTodo}
        onAddTaskInProgress={addTaskInProgressHandler}
        tasksInProgress={tasksInProgress}
        tasksDone={tasksDone}
      />
    </KanbanProvider>
  );
};

export default Kanban;
