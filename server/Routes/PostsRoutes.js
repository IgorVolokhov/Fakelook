const express = require("express");
const router = express.Router();
const {
  getPostForUser,
  getSmallerPostsForUser,
  getPostById,
  add,
  edit,
  remove,
} = require("../Controllers/PostsController");

router.post("/getpostsforuser", getPostForUser);
router.post("/getsmallerpostforuser", getSmallerPostsForUser);
router.post("/getpostbyid", getPostById);
router.post("/addpost", add);
router.patch("/editpost", edit);
router.delete("/removepost", remove);

module.exports = router;
