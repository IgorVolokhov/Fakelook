const {
  addOnlineUserOperation,
  deleteOnlineUserOperation,
  getOnlineUsersOperation,
  getUsersToFriendsOperation,
} = require("../Sql/dboperations/socketOperations");

class DBSocket {
  async addOnlineUser(userId, socketId) {
    return await addOnlineUserOperation(userId, socketId);
  }

  async deleteOnlineUser(socketId) {
    return await deleteOnlineUserOperation(socketId);
  }

  async getOnlineUsers() {
    return await getOnlineUsersOperation();
  }

  async getUsersToFriends(userId) {
    return await getUsersToFriendsOperation(userId);
  }
}

module.exports = new DBSocket();
