const serverStore = require("../serverStore");
// const friendsUpdate = require("../socketHandlers/updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user.data
  console.log(socket.user);

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._id,
  });

  // update pending friends invitations list
//   friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
//   friendsUpdate.updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;
