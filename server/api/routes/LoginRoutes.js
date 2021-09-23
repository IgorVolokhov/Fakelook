const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  remove,
  edit,
  googleLogin,
  forgotPassowrd
} = require("../controllers/UsersController");

router.post("/signup", signup);
router.post("/login", login);
router.delete("/remove", remove);
router.patch("/edit", edit);
router.post("/googlelogin", googleLogin);
router.post("/forgot",forgotPassowrd)

module.exports = router;
