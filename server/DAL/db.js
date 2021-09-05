const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { addUserDb, checkIfUserExistsDb } = require("./repository/login.db");
const adapter = new FileSync("db.json");
const db = low(adapter);

function addUser(username, password, email) {
  return addUserDb(db, username, password, email);
}

function checkIfUserExists(username, password) {
  return checkIfUserExistsDb(db, username, password);
}

module.exports = {
  addUser,
  checkIfUserExists,
};
