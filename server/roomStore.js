const usersInRoom = new Map();

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const userJoin = ({socketId, room, username}) => {
  usersInRoom.set(socketId, { username, room });
  console.log(`Users joined in ${room}`);
  console.log(usersInRoom);
};

// function getCurrentUser(id) {
//     return users.find(user => user.id === id);
// };

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
}

const getRoomUsers = (room) => {
  // return users.filter(user => user.room === room);
  const users = [];
  usersInRoom.forEach((value, key) => {
    if (value.room === room) {
      users.push({ socketId: key, username: value.username });
    }
  });
console.log(usersInRoom);
  return users;
};
module.exports = {
  userJoin,
  // getCurrentUser,
  userLeave,
  getRoomUsers,
  setSocketServerInstance,
  getSocketServerInstance
};
