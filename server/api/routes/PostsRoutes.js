const express = require("express");
const {
  authenticateTokenHeader,
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");
const router = express.Router();
const {
  getPostForUser,
  getSmallerPostsForUser,
  getAllPostsFromUserFriends,
  getPostById,
  add,
  edit,
  remove,
} = require("../controllers/PostsController");

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
router.delete("/removepost", authenticateTokenBody, remove);

module.exports = router;
