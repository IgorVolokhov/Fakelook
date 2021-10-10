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
  personalInfo,
  infoForSearchDiplay,
} = require("../controllers/UsersController");
const {
  refreshToken,
  logout,
  authenticateTokenBody,
} = require("../controllers/authenticatoinTokens");

router.post("/signup", signup);
router.post("/login", login);
router.post("/googlelogin", googleLogin);
router.delete("/remove", remove);
router.patch("/edit", authenticateTokenBody, edit);
router.post("/forgot", forgotPassowrd);
router.post("/change", changePassword);
router.post("/refreshtoken", refreshToken);
router.delete("/logout", logout);
router.post("/getpersonalinfo", authenticateTokenBody, personalInfo);
router.post("/getinfoforsearchdiplay", infoForSearchDiplay);
module.exports = router;
