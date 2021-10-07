const express = require("express");
const {
  authenticateTokenHeader,
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");
const router = express.Router();
const {
  getPosts,
  getPostForUser,
  getSmallerPostsForUser,
  getAllPostsFromUserFriends,
  getPostById,
  add,
  edit,
  remove,
  likePost
} = require("../controllers/PostsController");

router.post("/getallposts", authenticateTokenBody, getPosts);

router.post("/getpostsforuser", authenticateTokenBody, getPostForUser);
router.post(
  "/getsmallerpostforuser",
  authenticateTokenBody,
  getSmallerPostsForUser
);
router.post(
  "/getusersfriendspost",
  authenticateTokenBody,
  getAllPostsFromUserFriends
);
router.post("/getpostbyid", authenticateTokenBody, getPostById);
router.post("/addpost", authenticateTokenBody, add);
router.patch("/editpost", authenticateTokenBody, edit);
router.post("/removepost", authenticateTokenBody, remove);

module.exports = router;
