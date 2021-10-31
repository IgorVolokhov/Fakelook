require("dotenv").config();
const jwt = require("jsonwebtoken");

// TODO move to db
refreshTokens = [];

const generateToken = (user_id) => {
  const expiresIn = process.env.EXPIRES_IN;
  return {
    token: jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: `${expiresIn}s`,
    }),
    expiresIn: expiresIn,
  };
};

const generateRefreshToken = (user_id) => {
  const token = jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(token);
  return token;
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

  // TODO make it so logout cancles access token and not only refresh token.
  logout: (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.status(200).json({
      message: "you are logout",
    });
  },

  generateLoginTokens: async (req, res) => {
    const user_id = req.body.User_Id;
    const token = await generateToken(user_id);
    const refreshToken = await generateRefreshToken(user_id);

    res.status(200).json({
      token: token,
      refreshToken: refreshToken,
    });
  },

  verifyToken: (req, res) => {
    const token = req.body.token;
    console.log(req.body);
    if (token === null) {
      return res.status(400).json({
        message: `sadly your out`,
        isLoggedIn: false,
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, User_Id) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          message: `sadly your out`,
          isLoggedIn: false,
        });
      }
      res.status(200).json({
        user_id: User_Id.user_id,
        isLoggedIn: true,
      });
    });
  },
};
