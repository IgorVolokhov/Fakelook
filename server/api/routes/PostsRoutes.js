const express = require("express");
const { authenticateToken } = require("../controllers/authenticatoinTokens");
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

router.post("/getpostsforuser", authenticateToken, getPostForUser);
router.post("/getsmallerpostforuser", getSmallerPostsForUser);
router.post("/getusersfriendspost", getAllPostsFromUserFriends);
router.post("/getpostbyid", getPostById);
router.post("/addpost", add);
router.patch("/editpost", edit);
router.delete("/removepost", remove);

module.exports = router;
