require("dotenv").config();
const axios = require("axios").default;
const baseApiPort = `http://localhost:${process.env.PORT_AUTHENTICATION}/authentication/`;

module.exports = {
  getLoginTokens: async (user_id) => {
    const apiPort = baseApiPort + "generatelogintokens";
    const tokens = {};

    await axios.post(apiPort, { User_Id: user_id }).then((res) => {
      const { token, refreshToken } = res.data;
      tokens.token = token;
      tokens.refreshToken = refreshToken;
    });

    return tokens;
  },

  isAuthenticated: async (token) => {
    const apiPort = baseApiPort + "verifytoken";
    const ans = {};
    if (!token) {
      console.log("no token");
      return ans;
    }

    await axios.post(apiPort, { token: token }).then((res) => {
      console.log(res);
      const { isLoggedIn, user_id } = res.data;
      ans.isLoggedIn = isLoggedIn;
      ans.user_id = user_id;
    });

    return ans;
  },

  isAuthenticatedMiddleware: async (req, res, next) => {
    const apiPort = baseApiPort + "verifytoken";
    const token = req.body.token;
    if (!token) {
      console.log("no token");
      return ans;
    }
    let isAllowed = false;

    await axios.post(apiPort, { token: token }).then((res) => {
      console.log(res);
      const { isLoggedIn, user_id } = res.data;
      isAllowed = isLoggedIn;
      req.body.User_Id = user_id;
    });

    if (!isAllowed) {
      res.status(200).json({
        message: "out",
        isAllowed: isAllowed,
      });
    }
    next();
  },

  refreshToken: async (req, res) => {
    const apiPort = baseApiPort + "refreshtoken";

    await axios.post(apiPort, { token: req.body.token }).then((res) => {
      const { accessToken } = res.data;
      res.status(200).json({ accessToken: accessToken });
    });
  },
};
