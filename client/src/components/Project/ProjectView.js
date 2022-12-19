import React, { useEffect, useRef } from "react";
import Kanban from "../Kanban/Kanban";
import Chat from "../Chat/Chat";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./ProjectView.module.css";
import { FaComment } from "react-icons/fa";
import useClickOutside from "../../helpers/useClickOutside";
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

  const user = data?.me || data?.user || {};
  const [chat, setChat] = useState(false);
  const joinRoom = () => {
    
  }
  const username = user.username;
  const room = projectId;
  useEffect(() => {
    if (chat) {
      socket.emit("joinRoom", { username, room });
      console.log('user joined')
      
    }
    if (!chat) {
      // socket.off('joinRoom');
      socket.emit("leaveRoom", { username, room });
      console.log("user left");
    }
  }, [chat]);

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
            <Chat
              socket={socket}
              roomId={projectId}
              currentName={user.username}
              chat={chat}
              setChat={setChat}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProjectView;
