const express = require("express");
const router = express.Router();

const { signup, login,remove } = require("../Controllers/UsersController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/remove", remove);

module.exports = router;
