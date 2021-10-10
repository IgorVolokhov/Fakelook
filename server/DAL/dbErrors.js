const {
  getAllErrorsOperation,
  submitErrorOperation,
  removeErrorOperation,
} = require("../Sql/dummy_dboperations/errorsOperation");

class DBErrors {
  async getAllErrors() {
    return await getAllErrorsOperation();
  }

  async submitError(errorText) {
    return await submitErrorOperation(errorText);
  }

  async removeError(errorId) {
    return await removeErrorOperation(errorId);
  }
}

module.exports = new DBErrors();
