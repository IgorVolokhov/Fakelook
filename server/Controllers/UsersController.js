const { addUser, checkIfUserExists, removeUser } = require("../DAL/dbUsers");

module.exports = {
  signup: async (req, res) => {
    const isAdded = await addUser(req.body);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
      isAdded: isAdded
    });
  },

  login: async (req, res) => {
    const isLoggedIn = await checkIfUserExists(req.body);

    res.status(200).json({
      message: isLoggedIn ? `you can login in` : `does not try again!`,
      isLoggedIn: isLoggedIn
    });
  },

  remove: async (req, res) => {
    const isRemoved = await removeUser(req.body);

    res.status(200).json({
      message: isRemoved ? `User removed` : `Didn't remove`,
      isRemoved: isRemoved
    });
  }
};
