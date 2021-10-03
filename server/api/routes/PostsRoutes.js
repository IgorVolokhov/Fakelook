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
} = require("../controllers/PostsController");

router.post("/getallposts", getPosts)
router.post("/getpostsforuser", getPostForUser);
router.post("/getsmallerpostforuser", getSmallerPostsForUser);
router.post("/getusersfriendspost", getAllPostsFromUserFriends);
router.post("/getpostbyid", getPostById);
router.post("/addpost", add);
router.patch("/editpost", edit);
router.delete("/removepost", remove);

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
