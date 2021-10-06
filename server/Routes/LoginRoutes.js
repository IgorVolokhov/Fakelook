const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  remove,
  edit,
} = require("../api/controllers/UsersController");

router.post("/signup", signup);
router.post("/login", login);
router.delete("/remove", remove);
router.patch("/edit", edit);

module.exports = router;
