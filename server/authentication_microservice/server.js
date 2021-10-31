require("dotenv").config();
const http = require("http");
const app = require("./app");
// const port = process.env.PORT_AUTHENTICATION;
const port = process.env.PORT || process.env.PORT_AUTHENTICATION;

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send(`Hello World ${process.env.PORT}`);
});

server.listen(port, () => console.log(`run on port: ${port}`));
