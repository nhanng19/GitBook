import React from "react";
import classes from "./ProjectView.module.css";
import { FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
      <div className={classes.kanbanBox}>
        <div className={classes.kanban}>
          <div className={classes.kanbanHeader}>To-Do</div>
          <div className={classes.kanbanBody}>
            <div className={classes.kanbanItem}>
              <div className={classes.itemHeader}>
                <h3 className={classes.itemAssigner}>Richard</h3>
                <button className={classes.btn}>
                  <svg className={classes.icon}>
                    <FaTrashAlt size="2rem" />
                  </svg>
                </button>
                <button className={classes.btn}>
                  <svg className={classes.icon}>
                    <FaArrowRight size="2rem" />
                  </svg>
                </button>
              </div>
              <p className={classes.itemDescription}>Testing</p>
            </div>

            <div className={classes.kanbanItem}>
              <div className={classes.itemHeader}>
                <h3 className={classes.itemAssigner}>Richard</h3>
                <button className={classes.btn}>
                  <svg className={classes.icon}>
                    <FaTrashAlt size="2rem" />
                  </svg>
                </button>
                <button className={classes.btn}>
                  <svg className={classes.icon}>
                    <FaArrowRight size="2rem" />
                  </svg>
                </button>
              </div>
              <p className={classes.itemDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Netus et malesuada fames ac turpis egestas integer eget. Sit
                amet facilisis magna etiam
              </p>
            </div>
          </div>
        </div>

        <div className={classes.kanban}>
          <div className={classes.kanbanHeader}>In-Progress</div>
          <div className={classes.kanbanBody}>
            
          <div className={classes.kanbanItem}>
            <div className={classes.itemHeader}>
              <h3 className={classes.itemAssigner}>Richard</h3>
              <button className={classes.btn}>
                <svg className={classes.icon}>
                  <FaArrowLeft size="2rem" />
                </svg>
              </button>
              <button className={classes.btn}>
                <svg className={classes.icon}>
                  <FaArrowRight size="2rem" />
                </svg>
              </button>
            </div>            
              <p className={classes.itemDescription}>Testing adsfasdghajshdfjadasfhk testubgajkshdgakjshgdlkjasdghklj asdgagds</p>
            </div>
          </div>
        </div>

        <div className={classes.kanban}>
          <div className={classes.kanbanHeader}>Done</div>
          <div className={classes.kanbanBody}>
            <div className={classes.kanbanItem}>
                <div className={classes.itemHeader}>
                    <h3 className={classes.itemAssigner}>Richard</h3>
              <button className={classes.btn}>
                <svg className={classes.icon}>
                  <FaArrowLeft size="2rem" />
                </svg>
              </button>
              
              <button className={classes.btn}>
                <svg className={classes.icon}>
                  <FaTrashAlt size="2rem" />
                </svg>
              </button>
              </div>
              <p className={classes.itemDescription}>Testing</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.chatBox}>
        <div className={classes.chat}>
            <p>Richard : blah blah blah</p>
            <p>Nhan : lahb lahb lahb</p>
            <p>Dat : ahbl ahbl ahbl</p>
            <p>Lydia : hbla hbla hbla</p>
        </div>
        <form className={classes.chatForm}>
            <textarea className={classes.chatInput}>

            </textarea>
            <button className={` ${classes.sendBtn}`}>
                Send
            </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectView;
