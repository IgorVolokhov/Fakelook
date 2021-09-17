const express = require("express");
const router = express.Router();
const {
  getPostForUser,
  getSmallerPostsForUser,
  getAllPostsFromUserFriends,
  getPostById,
  add,
  edit,
  remove,
} = require("../Controllers/PostsController");

router.post("/getusersfriendspost", getAllPostsFromUserFriends);
router.post("/getpostsforuser", getPostForUser);
router.post("/getsmallerpostforuser", getSmallerPostsForUser);
router.post("/getpostbyid", getPostById);
router.post("/addpost", add);
router.patch("/editpost", edit);
router.delete("/removepost", remove);

module.exports = router;
