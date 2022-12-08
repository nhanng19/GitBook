import styles from "./Landing.module.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faDiagramNext,
  faMailBulk,
  faMessage,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1>Organized workspace, organized life</h1>
            <p>
              GitBook is your go-to hub for not just to-do lists but all of your
              projects. Connect and collaborate with like-minded inviduals.
            </p>
            <a href="#" className={styles.btn}>
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
  );
};

export default Landing;
