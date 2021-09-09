const { addUser, checkIfUserExists, removeUser } = require("../../DAL/dbUser");

module.exports = {
  signup: async (req, res) => {
    const { username, password, email } = req.body;
    const isAdded = await addUser(username, password, email);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
      isAdded: isAdded,
    });
  },
  login: async (req, res) => {
    const { username, password, email } = req.body;
    const isLoggedIn = await checkIfUserExists(username, password);

    res.status(200).json({
      message: isLoggedIn ? `you can login in` : `does not try again!`,
      isLoggedIn: isLoggedIn,
    });
  },
  remove: async (req, res) => {
    const { email } = req.body;
    const isAdded = await removeUser(email);
    console.log();
  },
};
