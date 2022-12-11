import React, { useState } from "react";

import KanbanBox from "./KanbanBox";
import KanbanForm from "./KanbanForm";
import KanbanNewTask from "./KanbanNewTask";

const DUMMY_DATA = [
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

const Kanban = () => {
  const [tasks, setTasks] = useState(DUMMY_DATA);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      return [...prevTasks, task];
    });
  };

  return (
    <>
      {/* <KanbanForm onAddTask={addTaskHandler} /> */}
      <KanbanNewTask onAddTask={addTaskHandler}/>
      <KanbanBox tasksTodo={tasks} />
    </>
  );
};

export default Kanban;
