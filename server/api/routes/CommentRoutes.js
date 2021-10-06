const express = require("express");
const {
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");
const router = express.Router();
const {
  getCommentsForPost,
  addCommentForPost,
  editCommentForPost,
} = require("../controllers/CommentController");

router.post("/getcommentsforpost", getCommentsForPost);
router.post("/addcommentforpost", authenticateTokenBody, addCommentForPost);
router.patch("/editcommentforpost", authenticateTokenBody, editCommentForPost);

module.exports = router;
