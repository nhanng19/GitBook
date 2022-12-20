const { User } = require("./models");
const authSocket = require("./utils/authSocket");
const {
  newConnectionHandler,
  joiningRoomHandler,
} = require("./socketHandlers/newConnectionHandler");
const {
  disconnectHandler,
  leaveRoomHandler,
} = require("./socketHandlers/disconnectHandler");
// const directMessageHandler = require("./socketHandlers/directMessageHandler");
// const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");

const formatMessage = require("./utils/message");

const roomStore = require("./roomStore");
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
    // const onlineUsers = serverStore.getOnlineUsers();
    // io.emit("online-users", { onlineUsers });
    // io.emit("online-users", "hellow");
  };

  io.on("connection", (socket) => {
    // console.log(socket.id);
    // console.log(socket.user.data);

    newConnectionHandler(socket, io);
    // emitOnlineUsers();

    // socket.on("direct-message", (data) => {
    //   directMessageHandler(socket, data);
    // });
    socket.on("leaveRoom", ({ username, room }) => {
      leaveRoomHandler(socket.id, room);
      // console.log("user left");
      // console.log(`${username} has left room ${room}`);
      socket.leave(room);
      const gettingUsers = roomStore.getRoomUsers(room);
      let users = [];
      gettingUsers.forEach((p) => {
        users.push(p);
      });

      socket.emit("emitUsers", users);

      io.to(room).emit(
        "announce",
        formatMessage("ChatBot", `${username} has left the chat`)
      );
    });

    socket.on("joinRoom", ({ username, room, profile }) => {
      joiningRoomHandler(socket.id, username, room, profile);
      // joiningRoomHandler(socket, "test");
      console.log(socket.user.data);
      socket.join(room);

      // const gettingUsers = roomStore.getRoomUsers(room);
      // console.log("users in the room", gettingUsers);
      const gettingUsers = roomStore.getRoomUsers(room);
      let users = [];
      gettingUsers.forEach((p) => {
        users.push(p);
      });
      const length = users.length - 1
      const lastItem = users[length];
      socket.emit("emitUsers", lastItem);

      // Broadcast when a user connects
      const chatBotMessage = formatMessage(
        "ChatBot",
        `${username} has joined the chat`
      );
      console.log(users)
      socket.broadcast.to(room).emit("announce", {chatBotMessage, users});

      const adminMessage = formatMessage(
        `Admin`,
        `Welcome ${username}!`
      )
      // Welcome current user
      socket.emit("welcome", {adminMessage, users});
      // console.log('is this.. rendering twice?');
      // io.to(user.room).emit("roomUsers", {
      //   room: user.room,
      //   users: getRoomUsers(user.room),
      // });
    });

    // Listen for ChatMessage
    socket.on("chatMessage", async ({ msg, room }) => {
      // const user = getCurrentUser(socket.id);
      const username = socket.user.data.username;

      // const sender = User.findOne({ username }).select('-__v -password')
      const sender = await User.findOne({
        username: username,
      });
      const picUrl = sender.picture;
      const message = formatMessage(username, msg);
      console.log(message);
      // io.emit("message", formatMessage(user.username, msg));
      io.to(room).emit("message", {
        message: message,
        picture: picUrl,
      });
    });

    socket.on("updateUser", async ({ room }) => {});

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
    // emitOnlineUsers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
