import React from "react";
import classes from "./ProjectView.module.css";
import Container from "../UI/Container";
import ProjectInfo from "./ProjectInfo";
import Kanban from "../Kanban/Kanban";
import Chat from "../Chat/Chat";

const ProjectView = () => {
  const DUMMY_DESCRIPTION = `project description test, dummy description.`;
  return (
    <Container>
      <ProjectInfo
        title="project title"
        date="2022/12/27"
        description={DUMMY_DESCRIPTION}
      />
      <Kanban />
      {/* <div className={classes.chatBox}>
        <div className={classes.chat}>
          <p>Richard : blah blah blah</p>
          <p>Nhan : lahb lahb lahb</p>
          <p>Dat : ahbl ahbl ahbl</p>
          <p>Lydia : hbla hbla hbla</p>
        </div>
        <form className={classes.chatForm}>
          <textarea className={classes.chatInput}></textarea>
          <button className={` ${classes.sendBtn}`}>Send</button>
        </form>
      </div> */}
      <Chat />
    </Container>
  );
};

export default ProjectView;
