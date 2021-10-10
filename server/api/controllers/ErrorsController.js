const {
  getAllErrors,
  submitError,
  removeError,
} = require("../../DAL/dbErrors");

module.exports = {
  getErrors: async (req, res) => {
    const getErrors = await getAllErrors();
    res.status(200).json({
      message: getErrors ? `Got Errors` : `Didn't get errors`,
      errors: getErrors
    });
  },

  addError: async (req, res) => {
    const addError = await submitError(req.body.errorId);
    res.status(200).json({
      message: addError ? `Got error` : `Didn't get error`,
    });
  },

  deleteError: async (req, res) => {
    const deleteError = await removeError(req.body.errorId);
    res.status(200).json({
      message: addError ? `Deleted error` : `Didn't delete error`,
    });
  },
};
