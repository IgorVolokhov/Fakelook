const express = require("express");
const app = express();
const morgan = require("morgan");
const { getPostsByUser } = require("./DAL/dbPosts");

const loginRoutes = require("./Routes/LoginRoutes");
const postRoutes = require("./Routes/PostsRoutes");
const commentsRoutes = require("./Routes/CommentRoutes");
// todo delete after testing
const {
  addComment,
  editComment,
  getCommentsForPost,
} = require("./Sql/dboperations/commentOperations");
const {
  addPost,
  getSmallerPostsByUser,
  editPost,
  getPostById,
  getAllPostsFromUserFriendsOperation
} = require("./Sql/dboperations/postOperations");
const {
  userLogin,
  addUserDb,
  editUser,
} = require("./Sql/dboperations/userOperations");

app.use(morgan("dev"));

app.use(express.json());
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

// todo delete this afte small testing
async function print() {
  console.log("comments:");
  console.log(await getCommentsForPost(1));
  console.log("whole posts by user:");
  console.log(await getPostsByUser(1));
  console.log("smaller posts by user:");
  console.log(await getSmallerPostsByUser(1));
  console.log("post by post id:");
  console.log(await getPostById(1));
}
//print();
// Routes
app.use("/users", loginRoutes);
app.use("/posts", postRoutes);
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
