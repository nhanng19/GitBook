const usersInRoom = new Map();

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const userJoin = ({ socketId, room, username, profile }) => {
  usersInRoom.set(socketId, { username, room, profile });
  console.log(`Users joined in ${room}`);
  console.log(usersInRoom);
};

// function getCurrentUser(id) {
//     return users.find(user => user.id === id);
// };

const userLeave = (socketId, room) => {
  if (usersInRoom.has(socketId)) {
    usersInRoom.delete(socketId);
    console.log("rest of the users")
    console.log(usersInRoom)
  }
  // const index = users.findIndex((user) => user.id === id);

  // if (index != -1) {
  //   return users.splice(index, 1)[0];
  // }
};

const getRoomUsers = (room) => {
  // return users.filter(user => user.room === room);
  const users = [];
  usersInRoom.forEach((value, key) => {
    if (value.room === room) {
      users.push(value.profile);
    }
  });
  return users;
};
module.exports = {
  userJoin,
  // getCurrentUser,
  userLeave,
  getRoomUsers,
  setSocketServerInstance,
  getSocketServerInstance,
};
