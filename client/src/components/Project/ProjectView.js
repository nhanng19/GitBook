import React from "react";
import classes from "./ProjectView.module.css";
import { FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Kanban from "../UI/Kanban";

const ProjectView = () => {
  return (
    <div className={classes.container}>
      <div className={classes.projectHeader}>
        <h1 className={classes.projectTitle}>Project Title</h1>
        <p className={classes.projectDate}>12/27/2022</p>
      </div>
      <h4 className={classes.projectDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada
        fames ac turpis egestas integer eget. Sit amet facilisis magna etiam
        tempor orci eu lobortis. Nam at lectus urna duis convallis convallis
        tellus id. Amet commodo nulla facilisi nullam vehicula ipsum a. Ultrices
        sagittis orci a scelerisque purus semper eget duis at. Integer quis
        auctor elit sed vulputate mi sit amet. Feugiat nibh sed pulvinar proin.
        Augue lacus viverra vitae congue eu consequat ac. Eu sem integer vitae
        justo eget. Pretium nibh ipsum consequat nisl vel pretium lectus quam.
      </h4>
      <form className={classes.toDoForm}>
        <div className={classes.inputHeader}>
          <label className={classes.formLabel}>To-do list:</label>
          <input className={classes.formInput}></input>
        </div>
        <div className={classes.inputBody}>
          <label className={classes.formLabel}>Assigners:</label>
          <input className={classes.formInput}></input>
          <button className={classes.addBtn}>Add</button>
        </div>
      </form>
      <Kanban />
      <div className={classes.chatBox}>
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
      </div>
    </div>
  );
};

export default ProjectView;
