const config = require("../dbconfig");
const sql = require("mssql");
const {
  turnStringSuitableForSql,
  getToDayDate,
} = require("../../utils/sqlFormating");

const submitErrorOperation = (error) => {
  console.log(error);
};

async function addOnlineUserOperation(userId, socketId) {
  try {
    let pool = await sql.connect(config);
    let usersRes = await pool
      .request()
      .query(`select * from OnlineUsers WHERE User_Id = ${userId}`);
    const users = usersRes.recordset;
    socketId = turnStringSuitableForSql(socketId);
    if (!users.some((user) => user.User_Id === userId)) {
      await pool
        .request()
        .query(
          `insert into OnlineUsers (User_Id, Socket_Id) values (${userId}, ${socketId})`
        );
      return true;
    } else {
      await pool
        .request()
        .query(
          `update OnlineUsers set Socket_Id = ${socketId} where User_Id = ${userId}`
        );
      return true;
    }
  } catch (error) {
    submitErrorOperation(error);
    return false;
  }
}

async function deleteOnlineUserOperation(socketId) {
  try {
    let pool = await sql.connect(config);
    socketId = turnStringSuitableForSql(socketId);
    await pool
      .request()
      .query(`delete from OnlineUsers WHERE Socket_Id = ${socketId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getOnlineUsersOperation() {
  try {
    let pool = await sql.connect(config);
    let usersRes = await pool.request().query(`select * from OnlineUsers`);
    const users = usersRes.recordset;
    return users;
  } catch (error) {
    submitErrorOperation(error);
    return null;
  }
}

async function getUsersToFriendsOperation(userId) {
  try {
    let pool = await sql.connect(config);
    let usersRes = await pool
      .request()
      .query(
        `select * from UsersToFriends where User_Id = '${userId}' or Friend_Id = '${userId}'`
      );
    const users = usersRes.recordset;
    return users;
  } catch (error) {
    submitErrorOperation(error);
    return null;
  }
}

async function addFriendsOperation(firstUserId, secondUserId) {
  try {
    const firstUserIdSql = firstUserId.userId;
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `insert into UsersToFriends (User_Id, Friend_Id) values (${firstUserIdSql}, ${secondUserId})`
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  addOnlineUserOperation,
  deleteOnlineUserOperation,
  getOnlineUsersOperation,
  getUsersToFriendsOperation,
  addFriendsOperation,
};
