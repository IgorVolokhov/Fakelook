require("dotenv").config();
const http = require("http");
const app = require("./app");
const port = process.env.PORT_POSTS;

const server = http.createServer(app);

server.listen(port, () => console.log(`run on http://localhost:${port}`));
