const socket = require("socket.io");
const {
  addOnlineUser,
  deleteOnlineUser,
  getOnlineUsers,
  getUsersToFriends,
} = require("../DAL/dbSocket");
const { addFriends } = require("../DAL/dbUsers");
const formatMessage = require("../utils/messages");

const botName = "chat bot";

// TODO move to db

const getUsers = async () => {
  const users = await getOnlineUsers();
  return users;
};

const startSocket = async (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    // when user connects
    console.log("i have some connection, socket id: ");
    console.log(socket.id);
    io.emit("message", formatMessage(botName, "Welcome to socket!!"));

    // on adding user, someone connected
    socket.on("emitAddUser", async (userId) => {
      //addUser(userId, socket.id);
      addOnlineUser(userId, socket.id);
      const users = await getUsers();
      io.emit("getUsers", users);
    });

    // send and get messages
    // TODO check if works
    socket.on("emitSendMessage", ({ senderId, reciverId, text }) => {
      //const user = getUser(reciverId);
      console.log("sending message to: ", user);

      io.to(user?.socketId).emit("getMessage", { senderId, text });
    });

    socket.on("emitFrindRequest", async ({ userId }) => {
      const users = await getUsers();
      let reciverSocketId = "";
      for (let index = 0; index < users.length; index++) {
        if (users[index].User_Id === userId) {
          reciverSocketId = users[index].Socket_Id;
          break;
        }
      }
      if (reciverSocketId === "") {
        console.log("noone found");
        return;
      }
      let senderId = "";
      for (let index = 0; index < users.length; index++) {
        if (users[index].Socket_Id === socket.id) {
          senderId = users[index].User_Id;
          break;
        }
      }
      if (await isFriendPairExists(senderId, userId)) {
        return;
      }
      io.to(reciverSocketId).emit("getFriendRequest", { userId: senderId });
    });

    socket.on("emitAcceptedFriendRequest", async (userId) => {
      const users = await getUsers();
      let accepterId = "";
      for (let index = 0; index < users.length; index++) {
        if (users[index].Socket_Id === socket.id) {
          accepterId = users[index].User_Id;
          break;
        }
      }
      addFriends(userId, accepterId);
    });

    // on disconnect
    // remove this socket id from sql
    socket.on("disconnect", async () => {
      console.log("=== a user disconected :( ===");
      deleteOnlineUser(socket.id);
      const users = await getUsers();
      io.emit("getUsers", users);
    });
  });
};

async function isFriendPairExists(firstUserId, secondUserId) {
  console.log(firstUserId, secondUserId);
  const users = await getUsersToFriends(firstUserId);
  console.log(users);
  for (let index = 0; index < users.length; index++) {
    if (
      users[index].User_Id === secondUserId ||
      users[index].Friend_Id === secondUserId
    ) {
      return true;
    }
  }
  return false;
}

module.exports = {
  startSocket,
};
