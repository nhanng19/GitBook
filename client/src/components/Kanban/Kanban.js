import React from "react";
import KanbanProvider from "../../store/KanbanProvider";

import KanbanBox from "./KanbanBox";
import KanbanNewTask from "./KanbanNewTask";



const Kanban = () => {
  // const [tasksTodo, setTasksTodo] = useState(DUMMY_DATA_TODO);
  // const [tasksInProgress, setTasksInProgress] = useState(
  //   DUMMY_DATA_IN_PROGRESS
  // );
  // const [tasksDone, setTasksDone] = useState(
  //   DUMMY_DATA_DONE
  // );

  // const addTaskTodoHandler = (task) => {
  //   setTasksTodo((prevTasks) => {
  //     return [...prevTasks, task];
  //   });
  // };

  // const addTaskInProgressHandler = (task) => {
  //   setTasksInProgress((prevTasks) => {
  //     return [...prevTasks, task];
  //   });
  // };

  return (
    <KanbanProvider>
      {/* <KanbanForm onAddTask={addTaskHandler} /> */}
      <KanbanNewTask  />
      <KanbanBox
      />
    </KanbanProvider>
  );
};

export default Kanban;
