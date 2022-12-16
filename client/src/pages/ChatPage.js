import Chat from "../components/Chat/Chat";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const ChatPage = ({ socket }) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [chat, showChat] = useState(true);
  const toggleChat = () => {
    showChat(!chat);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {chat && (
            <Chat
              roomId="Public"
              currentName={user.username}
              socket={socket}
              showChat={toggleChat}
            />
          )}
        </>
      )}
    </>
  );
};

export default ChatPage;
