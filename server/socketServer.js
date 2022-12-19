const authSocket = require('./utils/authSocket')
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
// const directMessageHandler = require("./socketHandlers/directMessageHandler");
// const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const formatMessage = require("./utils/message");

const serverStore = require("./serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

    io.use((socket, next) => {
      authSocket(socket, next);
    });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
    // io.emit("online-users", "hellow");
  };
  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log(socket.user.data)
        newConnectionHandler(socket, io);
        emitOnlineUsers();
 
    // socket.on("joinRoom", ({ username, room }) => {
    //   const user = userJoin(socket.id, username, room);

    //   socket.join(user.room);

    //   // Broadcast when a user connects
    //   socket.broadcast
    //     .to(user.room)
    //     .emit(
    //       "message",
    //       formatMessage("ChatBot", `${user.username} has joined the chat`)
    //     );

    //   // Welcome current user
    //   socket.broadcast.emit(
    //     "message",
    //     formatMessage("Admin", `Welcome ${user.username}`)
    //   );

    //   io.to(user.room).emit("roomUsers", {
    //     room: user.room,
    //     users: getRoomUsers(user.room),
    //   });
    // });

    // Listen for ChatMessage
    // socket.on("chatMessage", (msg) => {
    //   const user = getCurrentUser(socket.id);

    //   io.to(user.room).emit("message", formatMessage(user.username, msg));
    // });

    // Broadcast when a user disconnect
    socket.on("disconnect", () => {
      disconnectHandler(socket);
      // const user = userLeave(socket.id);

      // if (user) {
      //   io.to(user.room).emit(
      //     "message",
      //     formatMessage("Admin", `${user.username} has left the chat`)
      //   );
      // }
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
