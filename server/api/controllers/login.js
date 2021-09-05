const { addUser, checkIfUserExists } = require("../../DAL/db");

module.exports = {
  signup: (req, res) => {
    const { username, password, email } = req.body;
    const isAdded = addUser(username, password, email);

    res.status(200).json({
      message: isAdded ? `added successfully` : `did not add :(`,
    });
  },
  login: (req, res) => {
    const { username, password, email } = req.body;
    const doesExist = checkIfUserExists(username, password);

    res.status(200).json({
      message: doesExist ? `you can login in` : `does not try again!`,
      doesExist: doesExist,
    });
  },
};
