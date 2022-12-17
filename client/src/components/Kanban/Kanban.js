import React from "react";
import KanbanBox from "./KanbanBox";
import KanbanNewTask from "./KanbanNewTask";

const Kanban = ({
  name,
  description,
  date,
  owner,
  repo,
  projectId,
  project,
}) => {
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
    <>
      {/* <KanbanForm onAddTask={addTaskHandler} /> */}
      <KanbanNewTask
        name={name}
        description={description}
        date={date}
        owner={owner}
        repo={repo}
        projectId={projectId}
      />
      <KanbanBox project={project} />
    </>
  );
};

export default Kanban;
