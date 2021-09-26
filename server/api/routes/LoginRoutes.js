const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  remove,
  edit,
  googleLogin,
  forgotPassowrd,
  changePassword,
} = require("../controllers/UsersController");
const {
  refreshToken,
  logout,
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");

router.post("/signup", signup);
router.post("/login", login);
router.delete("/remove", remove);
router.patch("/edit", authenticateTokenBody, edit);
router.post("/googlelogin", googleLogin);
router.post("/forgot", forgotPassowrd);
router.post("/change", changePassword);
router.post("/refreshtoken", refreshToken);
router.delete("/logout", logout);
module.exports = router;
