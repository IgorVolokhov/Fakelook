const express = require("express");
const { isAuthenticatedMiddleware } = require("../services/TokensService");
const router = express.Router();
const {
  getAllPostsForUserByUserIdes,
  getOnlyUserPosts,
  getOnlyFriendsPosts,
  getPostById,
  add,
  edit,
  remove,
  like,
} = require("../controllers/postsController");

router.post("/getpostbyid", isAuthenticatedMiddleware, getPostById);
router.post("/addpost", isAuthenticatedMiddleware, add);
router.patch("/editpost", isAuthenticatedMiddleware, edit);
router.delete("/removepost", isAuthenticatedMiddleware, remove);
router.post(
  "/getallpostsforuseranduserfriends",
  isAuthenticatedMiddleware,
  getAllPostsForUserByUserIdes
);
router.post("/getonlyuserposts", isAuthenticatedMiddleware, getOnlyUserPosts);
router.post(
  "/getonlyfriendsposts",
  isAuthenticatedMiddleware,
  getOnlyFriendsPosts
);
router.delete("/removepost", isAuthenticatedMiddleware, remove);
router.post("/likepost", isAuthenticatedMiddleware, like);

module.exports = router;
