import React from "react";
import classes from "./Kanban.module.css";
import { FaTrashAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Kanban = () => {
  return (
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus
              et malesuada fames ac turpis egestas integer eget. Sit amet
              facilisis magna etiam
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
            <p className={classes.itemDescription}>
              Testing adsfasdghajshdfjadasfhk testubgajkshdgakjshgdlkjasdghklj
              asdgagds
            </p>
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
  );
};

export default Kanban;
