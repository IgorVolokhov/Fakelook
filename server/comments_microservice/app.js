const express = require("express");
const app = express();
const morgan = require("morgan");

const commentsRoutes = require("./api/routes/CommentsRoutes");

app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
  })
);

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/comments", commentsRoutes);

// Error not Found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error Hanlder
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// this is new message

module.exports = app;
