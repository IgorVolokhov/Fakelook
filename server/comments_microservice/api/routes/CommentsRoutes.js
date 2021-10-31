const express = require("express");
const router = express.Router();
const {
  getCommentsForPost,
  addCommentForPost,
  editCommentForPost,
  like,
} = require("../controllers/CommentsController");
const { isAuthenticatedMiddleware } = require("../services/TokensService");

router.post("/getcommentsforpost", getCommentsForPost);
router.post("/addcommentforpost", isAuthenticatedMiddleware, addCommentForPost);
router.patch(
  "/editcommentforpost",
  isAuthenticatedMiddleware,
  editCommentForPost
);
router.post("/likecomment", isAuthenticatedMiddleware, like);

module.exports = router;
