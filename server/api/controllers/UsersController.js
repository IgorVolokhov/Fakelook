const {
  addUser,
  checkIfUserExists,
  removeUser,
  editUser,
  emailLoginDal,
  forgotPassword,
  changePassword,
  getPersonalInfo,
  getInfoForSearchDisplay,
  getUserByEmail,
} = require("../../DAL/dbUsers");
const {
  generateAccessToken,
  generateRefreshAccessToken,
} = require("./authenticatoinTokens");

module.exports = {
  signup: async (req, res) => {
    const isAdded = await addUser(req.body);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
      isAdded: isAdded,
    });
  },

  login: async (req, res) => {
    console.log(req.body);
    const { isSignedIn, user } = await checkIfUserExists(req.body);

    if (isSignedIn) {
      const accessToken = generateAccessToken(user.User_Id);
      const refreshToken = generateRefreshAccessToken(user.User_Id);

      res.status(200).json({
        message: `you can login in`,
        isSignedIn: isSignedIn,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      return;
    }

    res.status(200).json({
      message: `sadly your out`,
      isSignedIn: isSignedIn,
    });
  },

  // not implemented yet
  remove: async (req, res) => {
    const isRemoved = await removeUser(req.body.userId);

    res.status(200).json({
      message: isRemoved ? `User removed` : `Didn't remove`,
      isRemoved: isRemoved,
    });
  },

  // works!
  edit: async (req, res) => {
    console.log("this is body");
    console.log(req.body);
    const isSuccsess = await editUser(req.body);

    res.status(200).json({
      message: isSuccsess ? `edited successfully` : `did not edit :(`,
      isSuccsess: isSuccsess,
    });
  },

  changePassword: async (req, res) => {
    const isSuccsess = await changePassword(
      req.body.KeyEmail,
      req.body.NewPass,
      req.body.Email
    );
    console.log("loolking for:", isSuccsess);
    res.status(200).json({
      message: isSuccsess ? ` change` : `didnt change  :(`,
      isSuccsess: isSuccsess,
    });
  },

  forgotPassowrd: async (req, res) => {
    const isSuccsess = await forgotPassword(req.body.Email);
    console.log("loolking for:", isSuccsess);
    res.status(200).json({
      message: isSuccsess ? `send successfully` : `didnt send  :(`,
      isSuccsess: isSuccsess,
    });
  },

  emailLogin: async (req, res) => {
    const { email } = req.body;

    const { isSuccess, token } = await emailLoginDal(email);

    if (!isSuccess) {
      res.status(200).json({
        message: "somehting went wrong",
        isLoggedIn: isSuccess,
      });
      return;
    }

    console.log("was good ");
    const { user, isSignedIn } = await getUserByEmail(email);
    console.log("user: ", user);

    const accessToken = await generateAccessToken(user.User_Id);
    const refreshToken = await generateRefreshAccessToken(user.User_Id);

    console.log(accessToken);
    console.log(refreshToken);
    res.cookie("session-token", token);
    res.status(200).json({
      message: "good good",
      isLoggedIn: isSuccess,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },

  personalInfo: async (req, res) => {
    const { userInfo } = await getPersonalInfo(req.body.User_Id);
    res.status(200).json({
      userInfo: userInfo,
    });
  },

  infoForSearchDiplay: async (req, res) => {
    const information = await getInfoForSearchDisplay(req.body.userIdes);
    res.status(200).json({
      information: information,
    });
  },
};
