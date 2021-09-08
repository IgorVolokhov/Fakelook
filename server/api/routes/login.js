const express = require("express");
const router = express.Router();

const { signup, login,remove } = require("../controllers/login");

router.post("/signup", signup);
router.post("/login", login);
router.post("/remove", remove);

module.exports = router;
