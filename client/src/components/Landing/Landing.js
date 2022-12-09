import styles from "./Landing.module.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faDiagramNext,
  faMailBulk,
  faMessage,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// importing dependencies for sign-in modal
import { Nav, Modal, Tab } from 'react-bootstrap';
import loginForm from '../LoginModal/LoginModal';
import signUpForm from '../SignupModal/SignupModal';

const Landing = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>Organized workspace, organized life</h1>
              <p>
                GitBook is your go-to hub for not just to-do lists but all of your
                projects. Connect and collaborate with like-minded inviduals.
              </p>
              <a className={styles.btn} onClick={() => setShowModal(true)}>
                Get Started
              </a>
              <a href="#" className={styles.btn}>
                View Projects
              </a>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {" "}
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

      {/* login/signup modal */}
      <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey='login'>
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                  <Nav.Item>
                    <Nav.Link eventKey='login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey='login'>
                  <loginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                  <signUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    
  );
};

export default Landing;
