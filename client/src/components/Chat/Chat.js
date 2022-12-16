import styles from "./Chat.module.css";
import { useEffect } from "react";
const Chat = ({ roomId, currentName, socket, showChat }) => {
  const username = currentName;
  const room = roomId;
  const userList = document.getElementById("user-list");
  // function to recieve data from server and render it onto page
  const outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="userMessage">${message.username} <span>${message.time}</span></p>
        <p className="text">
            ${message.text}
        </p>`;

    document.getElementById("chatBox").appendChild(div);
  };

  // Add user to DOM
  const outputUsers = (users) => {
    userList.innerHTML = `
         ${users
           .map((user) => `<li className={styles.user}>${user.username}</li>`)
           .join("")}
        `;
  };
  // Submit chat function
  const submitForm = (e) => {
    e.preventDefault();
    // retrieve text to send
    const msg = e.target.elements.msg.value;
    // sending message to server
    socket.emit("chatMessage", msg);
    // Clear input and focus on input area
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  };

  // Join chatroom
  socket.emit("joinRoom", { username, room });

  useEffect(() => {
    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      outputUsers(users);
    });
    socket.off("message").on("message", (message) => {
      outputMessage(message);
    });
    // Send message to server side.
  }, []);

  return (
    <>
      <div onClick={showChat} className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.rightSideBar}>
          <h2 className={styles.sideHeader}>Active Users:</h2>
          <hr></hr>
          <ul className={styles.userList} id="user-list"></ul>
        </div>
        <div className={styles.mainChat}>
          <div className={styles.header}>
            <p className={styles.roomId}>Current Room: {room}</p>
            {/* <button className={styles.leaveBtn}>Leave Chat</button> */}
          </div>
          <div className={styles.chatBox} id="chatBox"></div>
          <form
            className={styles.chatInput}
            id="chatForm"
            onSubmit={submitForm}
          >
            <input
              id="msg"
              type="text"
              placeholder="Enter message"
              className={styles.chatText}
              autoComplete="off"
              required
            ></input>
            <button className={styles.sendBtn} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
