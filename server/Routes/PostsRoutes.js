const express = require("express");
const router = express.Router();
const { add, remove, get, edit } = require("../Controllers/PostsController");

router.post("/addpost", add);
router.delete("/removepost", remove);
router.post("/getposts", get);
router.post("/editpost", edit);

module.exports = router;
