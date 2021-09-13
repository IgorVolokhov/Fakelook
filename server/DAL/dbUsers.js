const {
  addUserDb,
  userLoginDb,
  editUserDb,
} = require("../Sql/dboperations/userOperations");

class DBUser {
  async addUser(user) {
    return await addUserDb(user);
  }

  async removeUser(userId) {
    console.log("not implemented, is needed?");
  }

  async checkIfUserExists(user) {
    return await userLoginDb(user);
  }

  async editUser(user) {
    return await editUserDb(user);
  }
}

module.exports = new DBUser();
