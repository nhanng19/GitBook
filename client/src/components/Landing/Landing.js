import styles from "./Landing.module.css";
import {Link} from "react-scroll"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faDiagramNext,
  faMailBulk,
  faMessage,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// importing dependencies for sign-in modal
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import LoginForm from "../LoginModal/LoginModal";
import SignUpForm from "../SignupModal/SignupModal";
import React, { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>Organized workspace, organized life</h1>
              <p>
                GitBook is your go-to hub for not just to-do lists but all of
                your projects. Connect and collaborate with like-minded
                inviduals.
              </p>
              <a className={styles.btn} onClick={() => setShowModal(true)}>
                Get Started
              </a>
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={0}
                duration={1000}
              >
                View Projects
              </Link>
        
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.img}>
            <div className={styles.icon}>
              <div>
                <FontAwesomeIcon icon={faMailBulk} />
              </div>
              <div>
                <FontAwesomeIcon icon={faGithub} />
              </div>
              <div>
                <FontAwesomeIcon icon={faMessage} />
              </div>
              <div>
                <FontAwesomeIcon icon={faUserFriends} />
              </div>
              <div>
                <FontAwesomeIcon icon={faDiagramNext} />
              </div>
            </div>
            <img src="" alt="" className={styles.email} />
          </div>
        </div>

        <div className={styles.ocean}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>

      <Modal
        dialogClassName="border-radius-2"
        size="s"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header style={{ backgroundColor: "#CCD6A6" }} closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item style={{ fontSize: "2rem" }}>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ fontSize: "2rem" }}>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm
                  setLoading={setLoading}
                  style={{ width: "50%" }}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm
                  setLoading={setLoading}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {loading && <LoadingSpinner />}
    </>
  );
};

export default Landing;
