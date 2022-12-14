import styles from "./About.module.css";
// import logo from "../../assets/gitbook-logo.png"
// import Col from "react-bootstrap/Col";
import Creators from "./Cards";

const About = () => {
    return (
        <>
        <div className={styles.header}>
            <p>About Us</p>
        </div>
        <div className={styles.introOne}>
            <p>Hello fellow developer! Welcome to Gitbook!</p>
            {/* <img className={styles.logoPic} alt="Gitbook Logo" src={logo}></img> */}
        </div>
        <div className={styles.paraOne}>
            <p>
                Gitbook is designed to be your go-to application to collaborate with other developers on different projects! Gitbook allows you to instantly connect your Github account by using your Github username when signing up.
            </p>
        </div>
        <div className={styles.usage}>
            <p className={styles.usageTitle}>Github Uses:</p>
                <ul className={styles.points}>
                    <li>View users' repositories</li>
                    <li>Create new collaborative projects</li>
                    <li>Assign tasks to specific team members</li>
                    <li>Chat with team members</li>
                </ul>
        </div>
        <div>
            <p className={styles.creators}>Creators:</p>
            <Creators />
        </div>
        </>
    )
}

export default About;