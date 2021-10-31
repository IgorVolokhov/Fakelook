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
const { getLoginTokens } = require("../services/userServices");

module.exports = {
  signup: async (req, res) => {
    const isAdded = await addUser(req.body);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
      isAdded: isAdded,
    });
  },

  login: async (req, res) => {
    const { isSignedIn, user } = await checkIfUserExists(req.body);

    if (isSignedIn) {
      const tokens = await getLoginTokens(user.User_Id);
      console.log(tokens);

      res.status(200).json({
        message: `you can login in`,
        isSignedIn: isSignedIn,
        accessToken: tokens.token,
        refreshToken: tokens.refreshToken,
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
    const user_id = req.body.User_Id;
    const isLoggedIn = user_id ? true : false;
    if (!isLoggedIn) {
      res.status(400).json({
        message: `did not edit :(`,
        isSuccsess: false,
      });
    }
    req.body.User_Id = user_id;
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

    const tokens = await getLoginTokens(user.User_Id);

    res.cookie("session-token", token);
    res.status(200).json({
      message: "good good",
      isLoggedIn: isSuccess,
      accessToken: tokens.token,
      refreshToken: tokens.refreshToken,
    });
  },

  // add auth
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
