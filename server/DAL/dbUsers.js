const {
  signinOperation,
  signupOperation,
  editUserOperation,
  googleLoginOperation,
  forgotpasswordOperation,
} = require("../Sql/dummy_dboperations/userOperation");

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

  async googleLoginDal(email, googleId, id_token) {
    return await googleLoginOperation(email, googleId, id_token);
  }

  async forgotPassword(email){
    return await forgotpasswordOperation(email)
  }
}

module.exports = new DBUser();
