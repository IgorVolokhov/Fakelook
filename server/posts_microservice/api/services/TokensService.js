require("dotenv").config();
const axios = require("axios").default;
const baseApiPort = `http://localhost:${process.env.PORT_AUTHENTICATION}/authentication/`;

module.exports = {
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
};
