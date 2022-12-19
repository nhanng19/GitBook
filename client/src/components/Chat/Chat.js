import styles from "./Chat.module.css";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/useClickOutside";
const Chat = ({ roomId, currentName, socket, chat, setChat }) => {
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setChat(false);
  });

  const username = currentName;
  const room = roomId;

  //   socket.on('online-users', (message) => {
  //   console.log(message);
  // })
  // console.log(socket);

  // function to recieve data from server and render it onto page
  const outputMessage = (message) => {
    const chatRoom = document.getElementById("chatBox");
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="userMessage">${message.username} <span>${message.time}</span></p>
        <p className="text">
            ${message.text}
        </p>`;

    chatRoom.appendChild(div);
    chatRoom.scrollTo(0, 9999);
  };

  // Add user to DOM
  // const outputUsers = (users) => {
  //   const userList = document.getElementById("user-list");
  //   userList.innerHTML = `
  //    <li class={styles.user}>${users[users.length - 1].username}</li>`;
  // };
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

  // useEffect(() => {
  //   //   // Get room and users
  //   // socket.on("roomUsers", ({ room, users }) => {});
  //   socket.off("message").on("message", (message) => {
  //     outputMessage(message);
  //   });
  //   socket.on("message", (message) => {
  //     outputMessage(message);
  //   });
  //   return () => socket.off("roomUsers");
  // }, []);

  useEffect(() => {
    socket.once("announce", (message) => {
      console.log(message);
    });
    socket.once("welcome", (message) => {
      console.log(message);
    });
  }, []);
  

  return (
    <>
      <div className={styles.overlay}></div>
      <div data-aos="fade-down" ref={popup} className={styles.container}>
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
