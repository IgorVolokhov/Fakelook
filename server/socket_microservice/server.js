require("dotenv").config();
const http = require("http");
const app = require("./app");
const port = process.env.PORT_SOCKET;
const { startSocket } = require("./socket-io/index");

const server = http.createServer(app);

server.listen(port, () => console.log(`run on http://localhost:${port}`));

startSocket(server);
