const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const rep = require("../Repository/UsersDB");

class DBUser {

  async addUser(user) {
    return await rep.addUserDb(user);
  }

  async removeUser(userId) {
    return await rep.removeUserDB(userId);
  }

  async checkIfUserExists(user) {
    return await rep.userLogin(user);
  }
}

module.exports = new DBUser();
