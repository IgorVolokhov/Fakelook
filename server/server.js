const http = require("http");
const app = require("./app");
const { startSocket } = require("./socket-io");
const port = 3001;

const server = http.createServer(app);

server.listen(port, () => console.log(`run on http://localhost:${port}`));

startSocket(server);
