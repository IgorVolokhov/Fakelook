const {
  signinOperation,
  signupOperation,
  editUserOperation,
} = require("../Sql/dboperations/userOperations");

class DBUser {
  async addUser(user) {
    return await signupOperation(user);
  }

  async removeUser(userId) {
    console.log("not implemented, is needed?");
    return false;
  }

  // sign ins checks if user info exists in db
  async checkIfUserExists(user) {
    return await signinOperation(user);
  }

  async editUser(user) {
    return await editUserOperation(user);
  }
}

module.exports = new DBUser();
