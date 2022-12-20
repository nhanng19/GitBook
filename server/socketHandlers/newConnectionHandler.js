const serverStore = require("../serverStore");
const roomStore = require("../roomStore");

// const friendsUpdate = require("../socketHandlers/updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user.data;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._id,
  });

  // update pending friends invitations list
  //   friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  //   friendsUpdate.updateFriends(userDetails.userId);
};

const joiningRoomHandler = async (socketId, username, room, profile) => {
  // const userId = id;
  // const username = name;
  // const roomId = room;
  
  

  roomStore.userJoin({
    room: room,
    username: username,
    socketId: socketId,
    profile: profile,
  });
};

module.exports = { newConnectionHandler, joiningRoomHandler };
