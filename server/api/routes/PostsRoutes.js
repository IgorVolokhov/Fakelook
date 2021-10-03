const express = require("express");
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

module.exports = router;
