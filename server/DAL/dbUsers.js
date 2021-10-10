const {
  signinOperation,
  signupOperation,
  editUserOperation,
  googleLoginOperation,
  forgotpasswordOperation,
  changePasswordOperation,
  getPersonalInfoOperation,
  getInfoForSearchDisplayOperations,
  addFriendsOperation,
} = require("../Sql/dboperations/userOperations");

class DBUser {
  async addUser(user) {
    return await signupOperation(user);
  }

  async removeUser(userId) {
    console.log("not implemented, is needed?");
    return false;
  }

  async checkIfUserExists(user) {
    return await signinOperation(user);
  }

  async editUser(user) {
    return await editUserOperation(user);
  }
  async changePassword(key, newPass, email) {
    return await changePasswordOperation(key, newPass, email);
  }
  async googleLoginDal(email, googleId, id_token) {
    return await googleLoginOperation(email, googleId, id_token);
  }

  async forgotPassword(email) {
    return await forgotpasswordOperation(email);
  }

  async getPersonalInfo(user_id) {
    return await getPersonalInfoOperation(user_id);
  }

  async getInfoForSearchDisplay(userIdes) {
    return await getInfoForSearchDisplayOperations(userIdes);
  }

  async addFriends(userId, friendId) {
    return await addFriendsOperation(userId, friendId);
  }

  async getUserByEmail(email) {
    return await getUserByEmailOperation(email);
  }
}

module.exports = new DBUser();
