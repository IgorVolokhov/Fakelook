const socket = require("socket.io");
const formatMessage = require("../utils/messages");

const botName = "chat bot";

const startSocket = async (server) => {
  // const io = socket(server, {
  //   cors: {
  //     origin: "*",
  //   },
  // });
  // io.on("connection", (socket) => {
  //     console.log("i have some connection, socket id: ");
  //     console.log(socket.id);
  //   // Welcome current user
  //   socket.emit("message", formatMessage(botName, "Welcome to chat!!"));
  //   socket.on("message", (message) => {
  //     console.log("i have some message");
  //     console.log(message);
  //   })
  //   socket.on("emitPostAdded", ({ post, user}) => {
  //     console.log("i have something");
  //     console.log(post);
  //     console.log(user);
  //   })
  // })
};

module.exports = {
  startSocket,
};
