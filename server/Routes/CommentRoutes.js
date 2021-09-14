const express = require("express");
const router = express.Router();
const {
  getCommentsForPost,
  addCommentForPost,
  editCommentForPost,
} = require("../Controllers/CommentController");

router.post("/getcommentsforpost", getCommentsForPost);
router.post("/addcommentforpost", addCommentForPost);
router.patch("/editcommentforpost", editCommentForPost);

module.exports = router;
