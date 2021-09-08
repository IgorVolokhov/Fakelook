const { addUser, checkIfUserExists, removeUser } = require("../../DAL/dbUser");

module.exports = {
  signup: async (req, res) => {
    const { username, password, email } = req.body;
    const isAdded = await addUser(username, password, email);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
    });
  },
  login: async (req, res) => {
    const { username, password, email } = req.body;
    const doesExist = await checkIfUserExists(username, password);

    res.status(200).json({
      message: doesExist ? `you can login in` : `does not try again!`,
      doesExist: doesExist,
    });
  },
  remove: async (req,res) => {
    const {email} = req.body
    const isAdded = await removeUser(email);
    console.log();
  }
};
