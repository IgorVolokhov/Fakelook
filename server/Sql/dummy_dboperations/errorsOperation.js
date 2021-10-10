const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const { uniqueId } = require("../../utils/uniqueId");

async function getAllErrorsOperation() {
  try {
    const errors = db.get("errors").value();
    return errors.length > 0 ? errors : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function submitErrorOperation(errorText) {
  try {
    const errors = db.get("errors").value();
    errors.push({
      Error_Id: uniqueId(),
      Info: errorText,
      Time: Date.now(),
    });
    db.write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeErrorOperation(errorId) {
  try {
    const errors = db.get("errors").value();
    for (let index = 0; index < errors.length; index++) {
      if (errors[index].Error_Id === errorId) {
        errors.splice(index, 1);
        break;
      }
    }
    db.write();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getAllErrorsOperation,
  submitErrorOperation,
  removeErrorOperation
};
