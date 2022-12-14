import Card from 'react-bootstrap/Card';
import Nhan from "../../assets/creator-pics/nhan.png";
import Dat from "../../assets/creator-pics/dat.png";
import Richard from "../../assets/creator-pics/richard.png";
import Lydia from "../../assets/creator-pics/lydia.png";

import styles from "./Cards.module.css";

function CreatorsCards() {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.card}>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={Nhan} />
                <Card.Body>
                    <Card.Title className={styles.title}>Nhan Nguyen</Card.Title>
                    <Card.Text className={styles.text}>
                        <a href='https://github.com/nhanng19'>Nhan's Github</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        <div className={styles.card}>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={Dat} />
                <Card.Body>
                    <Card.Title className={styles.title}>Dat Nguyen</Card.Title>
                    <Card.Text className={styles.text}>
                        <a href='https://github.com/Crestatic'>Dat's Github</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        <div className={styles.card}>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={Richard} />
                <Card.Body>
                    <Card.Title className={styles.title}>Richard "Yi Chan" You</Card.Title>
                    <Card.Text className={styles.text}>
                        <a href='https://github.com/YichanYouRichard'>Richard's Github</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        <div className={styles.card}>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={Lydia} />
                <Card.Body>
                    <Card.Title className={styles.title}>Lydia Kim</Card.Title>
                    <Card.Text className={styles.text}>
                        <a href='https://github.com/lydiakim10'>Lydia's Github</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default CreatorsCards;