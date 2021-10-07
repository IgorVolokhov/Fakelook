const express = require("express");
const {
  authenticateTokenHeader,
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");
const router = express.Router();
const {
  getAllPostsForUserByUserIdes,
  getOnlyUserPosts,
  getOnlyFriendsPosts,
  getPostById,
  add,
  edit,
  remove,
  likePost
} = require("../controllers/PostsController");

<<<<<<< HEAD
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
=======
router.post("/getpostbyid", authenticateTokenBody, getPostById);
router.post("/addpost", authenticateTokenBody, add);
router.patch("/editpost", authenticateTokenBody, edit);
router.delete("/removepost", authenticateTokenBody, remove);
router.post(
  "/getallpostsforuseranduserfriends",
  authenticateTokenBody,
  getAllPostsForUserByUserIdes
);
router.post("/getonlyuserposts", authenticateTokenBody, getOnlyUserPosts);
router.post("/getonlyfriendsposts", authenticateTokenBody, getOnlyFriendsPosts);
>>>>>>> 88f139f57531eee63bbf7d2b770a17cee60fcdd4

module.exports = router;
