import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaComment } from "react-icons/fa";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import useClickOutside from "../../helpers/useClickOutside";

import Kanban from "../Kanban/Kanban";
import LoadingSpinner from "../UI/LoadingSpinner";
// import Chat from "../Chat/Chat";

import styles from "./ProjectView.module.css";
import classes from "../Chat/Chat.module.css";

const ProjectView = ({
  name,
  description,
  date,
  owner,
  repo,
  projectId,
  project,
  socket,
}) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  console.log("me", data?.me);
  console.log("user", data?.user);
  const user = data?.me || data?.user || {};

  const [chat, setChat] = useState(false);

  const popup = useRef(null);
  useClickOutside(popup, () => {
    setChat(false);
  });

  const username = user.username;
  const room = projectId;

  useEffect(() => {
    if (chat) {
      socket.emit("joinRoom", { username, room });
      console.log("user joined");
    }
    if (!chat) {
      // socket.off('joinRoom');
      socket.emit("leaveRoom", { username, room });
      console.log("user left");
    }
    socket.emit('updateUser', {room});
  }, [chat]);

  useEffect(() => {
    //   // Get room and users
    // socket.on("roomUsers", ({ room, users }) => {});
    // socket.off("message").on("message", (message) => {
    //   outputMessage(message);
    // });
    // socket.off('message');
    socket.on("message", ({ message, picture }) => {
      outputMessage({ message, picture });
    });

    // return () => socket.off("roomUsers");
  }, []);
  useEffect(() => {
    socket.on("announce", (message) => {
      const picture = null
      outputMessage({ message, picture });
    });
    socket.on("welcome", (message) => {
      const picture = null
      outputMessage({ message, picture });
    });
    socket.on('emitUsers', (gettingUsers) => {
      console.log(gettingUsers)
    })
  }, []);
  const returnPicture = ({message, picture}) => {
    if (picture) {
      return picture
    };
    
    if (message.username === "Admin") {
      return "https://res.cloudinary.com/dc2xiz0gi/image/upload/v1671478621/profileImgs/admin_ih4chs.png";
    } else if (message.username === "ChatBot") {
      return "https://res.cloudinary.com/dc2xiz0gi/image/upload/v1671478621/profileImgs/chatbot_vpx8vl.png";
    } else {
      return null;
    }
  };

  const outputMessage = ({ message, picture }) => {
    const chatRoom = document.getElementById("chatBox");
    const div = document.createElement("div");
    div.classList.add("message");
    
      const picUrl = returnPicture({message, picture});
    

    div.innerHTML = `<img class="chatImage" src='${picUrl}'><p class="userMessage">${message.username}</p><span class="spanChat">(${message.time})</span>
        <p class="text">
            ${message.text}
        </p>`;

    chatRoom.appendChild(div);
    chatRoom.scrollTo(0, 9999);
  };

  const submitForm = (e) => {
    e.preventDefault();
    // retrieve text to send
    const msg = e.target.elements.msg.value;
    // sending message to server
    socket.emit("chatMessage", { msg, room });
    // Clear input and focus on input area
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  };
  // const textChangeHandler = (e) => {
  //   setText(e.target.value);
  // };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Kanban
            name={name}
            description={description}
            date={date}
            owner={owner}
            repo={repo}
            projectId={projectId}
            project={project}
          />
          <div>
            <ul className={styles.list}>
              <li>
                <button
                  className={styles.showChat}
                  onClick={() => setChat(true)}
                >
                  <FaComment />
                </button>
              </li>
            </ul>
          </div>

          {chat && (
            <>
              <div className={classes.overlay}></div>
              <div
                data-aos="fade-down"
                ref={popup}
                className={classes.container}
              >
                <div className={classes.rightSideBar}>
                  <h2 className={classes.sideHeader}>Active Users:</h2>
                  <hr></hr>
                  <ul className={classes.userList} id="user-list"></ul>
                </div>
                <div className={classes.mainChat}>
                  <div className={classes.header}>
                    <p className={classes.roomId}>Current Room: {room}</p>
                    {/* <button className={styles.leaveBtn}>Leave Chat</button> */}
                  </div>
                  <div className={classes.chatBox} id="chatBox"></div>
                  <form
                    className={classes.chatInput}
                    id="chatForm"
                    onSubmit={submitForm}
                  >
                    <input
                      id="msg"
                      type="text"
                      // value={text}
                      placeholder="Enter message"
                      className={classes.chatText}
                      autoComplete="off"
                      required
                      // onChange={textChangeHandler}
                    ></input>
                    <button className={classes.sendBtn} type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectView;
