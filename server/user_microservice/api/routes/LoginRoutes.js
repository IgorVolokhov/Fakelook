const express = require("express");
const router = express.Router();
const {
  login,
  edit,
  emailLogin,
  personalInfo,
  remove,
  forgotPassowrd,
  changePassword,
  infoForSearchDiplay,
  signup,
} = require("../controllers/loginController");
const {
  isAuthenticatedMiddleware,
  refreshToken,
} = require("../services/userServices");

// need tokens
router.post("/login", login);
router.post("/emaillogin", emailLogin);
router.patch("/edit", isAuthenticatedMiddleware, edit);
router.post("/getpersonalinfo", isAuthenticatedMiddleware, personalInfo);
router.post("/refreshtoken", refreshToken);

// no tokens
router.post("/signup", signup);
router.delete("/remove", remove);
router.post("/forgot", forgotPassowrd);
router.post("/change", changePassword);
router.post("/getinfoforsearchdiplay", infoForSearchDiplay);
module.exports = router;
