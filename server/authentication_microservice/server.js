require("dotenv").config();
const http = require("http");
const app = require("./app");
const port = process.env.PORT_AUTHENTICATION;
const url = process.env.URL_AUTHENTICATION;

const server = http.createServer(app);

server.listen(url, () => console.log(`run on url: ${url}`));
