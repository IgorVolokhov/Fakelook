require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: `sadly your out`,
        isLoggedIn: false,
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          message: `sadly your out`,
          isLoggedIn: false,
        });
      }
      req.user = user;
      next();
    });
  },

  generateAccessToken: (user_id) => {
    return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
  },
};
