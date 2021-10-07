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
} = require("../controllers/PostsController");

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

module.exports = router;
