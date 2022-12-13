import React from "react";
import styles from "./JoinChat.module.css";

const JoinChat = () => {
    return (
        <form className={styles.joinContainer}>
            <div className={styles.form}>
                <label>Username:</label>
                <input
                    type='text'
                    name='username'
                    id="username"
                    placeholder="Enter username"
                    className="inputField"
                    required />
            </div>
            <div className={styles.form}>
                <label>Chatroom:</label>
                <select name="room" id="room" className="inputField">
                    <option value="General">General</option>
                    <option value="Questions">Questions</option>
                    <option value="Colaboration">Colaboration</option>
                    <option value="Offtopic">Off topic</option>
                    <option value="userInput">userInput</option>
                </select>
            </div>
            <button className="styles.btn">Join Chatroom</button>
        </form>
    )
};

export default JoinChat;