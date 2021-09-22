const {
  addUser,
  checkIfUserExists,
  removeUser,
  editUser,
  googleLoginDal,
} = require("../../DAL/dbUsers");

module.exports = {
  // works!
  signup: async (req, res) => {
    const isAdded = await addUser(req.body);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
      isAdded: isAdded,
    });
  },

  // works!
  login: async (req, res) => {
    const isLoggedIn = await checkIfUserExists(req.body);

    res.status(200).json({
      message: isLoggedIn ? `you can login in` : `does not try again!`,
      isLoggedIn: isLoggedIn,
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
    const isSuccsess = await editUser(req.body);

    res.status(200).json({
      message: isSuccsess ? `edited successfully` : `did not edit :(`,
      isSuccsess: isSuccsess,
    });
  },

  // todo make it so you can sign up from google as well if first then use google info to make username and password etc
  googleLogin: async (req, res) => {
    const { email, googleId, id_token } = req.body;

    const { isSuccess, token } = await googleLoginDal(
      email,
      googleId,
      id_token
    );

    console.log("is isSuccess: ", isSuccess);
    console.log("token: ", token);

    if (!isSuccess) {
      res.status(200).json({
        message: "somehting went wrong",
        isLoggedIn: isSuccess,
      });
      return;
    }
    res.cookie("session-token", token);
    res.status(200).json({
      message: "good good",
      isLoggedIn: isSuccess,
    });
  },
};
