import React from "react";
import styles from "./Chat.module.css";

const Chat = () => {
    return (
        <div className={styles.container}>
            <div className={styles.rightSideBar}>
                <h2 className={styles.sideHeader}>Active Users:</h2>
                <hr></hr>
                <ul className={styles.userList}>
                    <li className={styles.user}>Dat</li>
                    <li className={styles.user}>Lydia</li>
                    <li className={styles.user}>Richard</li>
                    <li className={styles.user}>Nhan</li>
                </ul>
            </div>
            <div className={styles.mainChat}>
                <div className={styles.header}>
                    <p className={styles.roomId}>Current Room: Room.ID</p>
                    <a className={styles.leaveBtn}>Leave Chat</a>
                </div>
                <div className={styles.chatBox}></div>
                <div className={styles.chatInput}>
                    <div className={styles.chatText}>Input text here</div>
                    <a className={styles.sendBtn}>Send</a>
                </div>
            </div>
        </div>
    )
};

export default Chat;