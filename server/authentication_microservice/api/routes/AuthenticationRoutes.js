const express = require("express");
const router = express.Router();
const {
  refreshToken,
  logout,
  authenticateTokenBody,
  authenticateTokenHeader,
  generateLoginTokens,
  verifyToken,
} = require("../controllers/AuthenticationTokensController");

router.post("/authenticatetokenheader", authenticateTokenHeader);
router.post("/authenticatetokenbody", authenticateTokenBody);
router.post("/refreshtoken", refreshToken);
router.post("/logout", logout);

router.post("/generatelogintokens", generateLoginTokens);
router.post("/verifytoken", verifyToken);

module.exports = router;
