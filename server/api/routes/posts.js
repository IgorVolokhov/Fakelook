const express = require("express");
const router = express.Router();

const { add,remove } = require("../controllers/posts");

router.post("/addpost", add);
router.post("/removepost", remove);

module.exports = router;
