require("dotenv").config();
const jwt = require("jsonwebtoken");

// todo move to db
refreshTokens = [];

const verifyToken = async (token, req, res, next) => {
  if (token === null) {
    return res.status(200).json({
      message: `sadly your out`,
      isLoggedIn: false,
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User_id) => {
    if (err) {
      console.log(err);
      return res.status(200).json({
        message: `sadly your out`,
        isLoggedIn: false,
      });
    }
    req.body.User_Id = User_id.user_id;
    req.body.expiresIn = User_id.exp;
    next();
  });
};

const generateToken = (user_id) => {
  const expiresIn = process.env.EXPIRES_IN;
  return {
    token: jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: `${expiresIn}s`,
    }),
    expiresIn: expiresIn,
  };
};

module.exports = {
  authenticateTokenHeader: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    await verifyToken(token, req, res, next);
  },

  authenticateTokenBody: async (req, res, next) => {
    const token = req.body.token;
    await verifyToken(token, req, res, next);
  },

  generateAccessToken: (user_id) => {
    return generateToken(user_id);
  },

  generateRefreshAccessToken: (user_id) => {
    const token = jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(token);
    return token;
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(400);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(400);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, User_Id) => {
        if (err) return res.sendStatus(400);
        const accessToken = generateToken(User_Id);
        res.json({ accessToken: accessToken.token });
      }
    );
  },

  // todo make it so logout cancles access token and not only refresh token.
  logout: (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.status(200).json({
      message: "you are logout",
    });
  },
};
