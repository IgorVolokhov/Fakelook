module.exports = {
  signup: (req, res) => {
    const { username, password, email } = req.body;

    res.status(200).json({
      message: `signup: username: ${username}, password: ${password}, email: ${email}`,
    });
  },
  login: (req, res) => {
    const { username, password, email } = req.body;

    res.status(200).json({
      message: `login: username: ${username}, password: ${password}, email: ${email}`,
    });
  },
};
