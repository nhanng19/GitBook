import React from "react";
import styles from "./Chat.module.css";
import io from "socket.io-client";




const Chat = () => {
    
    const chatForm = document.getElementById('chatForm');
    const socket = io();

    socket.on('message', message => {
        console.log(message);
    })

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const msg = e.target.elements.msg.value;

        console.log(msg);
    })

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
                    <button className={styles.leaveBtn}>Leave Chat</button>
                </div>
                <div className={styles.chatBox}></div>
                <form className={styles.chatInput} id='chatForm'>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter message"
                        className={styles.chatText}
                        autoComplete="off"
                        required>
                    </input>
                    <button className={styles.sendBtn}>Send</button>
                </form>
            </div>
        </div>
    )
};

export default Chat;