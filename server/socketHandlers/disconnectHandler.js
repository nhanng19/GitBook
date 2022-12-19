const roomStore = require("../roomStore");
const serverStore = require("../serverStore");

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

const leaveRoomHandler = (socketId, room) => {
  roomStore.userLeave(socketId, room);
}

module.exports = {disconnectHandler, leaveRoomHandler};
