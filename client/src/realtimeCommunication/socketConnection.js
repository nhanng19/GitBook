import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
// import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";

let socket = null;

export const connectWithSocketServer = (token) => {
  const jwtToken = token

  socket = io("http://localhost:3000",
   {
    auth: {
      token: jwtToken,
    },
  }
  );

  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log("frontend socket connection", socket.id);
  });

//   socket.on("friends-invitations", (data) => {
//     const { pendingInvitations } = data;
//     store.dispatch(setPendingFriendsInvitations(pendingInvitations));
//   });

//   socket.on("friends-list", (data) => {
//     const { friends } = data;
//     store.dispatch(setFriends(friends));
//   });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
    console.log(onlineUsers);
  });

//   socket.on("direct-chat-history", (data) => {
//     console.log(data);
//     updateDirectChatHistoryIfActive(data);
//   });
};

// export const sendDirectMessage = (data) => {
//   console.log(data);
//   socket.emit("direct-message", data);
// };

// export const getDirectChatHistory = (data) => {
//   socket.emit("direct-chat-history", data);
// };
