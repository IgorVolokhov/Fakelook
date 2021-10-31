const config = require("../dbconfig");
const sql = require("mssql");
const {
  turnStringSuitableForSql,
  getToDayDate,
} = require("../../utils/sqlFormating");

const submitErrorOperation = (error) => {
  console.log(error);
};

async function getPostsByUserIdesOperation(userIdes) {
  try {
    let pool = await sql.connect(config);
    const userIdesForSql = userIdesToSqlUserIdes(userIdes);
    let posts = "";
    if (userIdes?.length > 1) {
      posts = await pool
        .request()
        .query(`SELECT * from Posts WHERE User_Id In (${userIdesForSql})`);
    } else {
      posts = await pool
        .request()
        .query(`SELECT * from Posts WHERE User_Id = ${userIdes[0]}`);
    }

    return posts.recordsets[0].length > 0 ? posts.recordsets[0] : null;
  } catch (error) {
    submitErrorOperation(error);
    return null;
  }
}

//TODO move to helpers
function userIdesToSqlUserIdes(userIdes) {
  let userIdesRes = "";
  for (let index = 0; index < userIdes.length; index++) {
    if (index < userIdes.length - 1) {
      userIdesRes += userIdes[index] + ", ";
    } else {
      userIdesRes += userIdes[index];
    }
  }
  return userIdesRes;
}

async function getPostByIdOperation(postId) {
  try {
    let pool = await sql.connect(config);
    let post = await pool
      .request()
      .query(`SELECT * from Posts where Post_Id = ${postId}`);
    return post.recordsets[0].length > 0 ? post.recordsets[0][0] : null;
  } catch (error) {
    submitErrorOperation(error);
    return null;
  }
}

async function addPostOperation(
  userId,
  image_src,
  lat,
  lon,
  description = null,
  tags = null
) {
  try {
    let pool = await sql.connect(config);

    description = turnStringSuitableForSql(description);
    tags = turnStringSuitableForSql(tags);

    const todayDate = turnStringSuitableForSql(getToDayDate());
    await pool.request().query(
      `insert into Posts (User_Id, Image_Src, Lat, Lon, Description, Tags, CreatedAt)
            values (${userId}, '${image_src}', ${lat}, ${lon}, ${description}, ${tags}, ${todayDate})`
    );
    return true;
  } catch (error) {
    submitErrorOperation(error);
    return false;
  }
}

async function editPostOperation(
  postId,
  lat,
  lon,
  description = null,
  tags = null
) {
  try {
    let pool = await sql.connect(config);

    description = turnStringSuitableForSql(description);
    tags = turnStringSuitableForSql(tags);

    await pool
      .request()
      .query(
        `update Posts set Description = ${description}, Tags = ${tags} where Post_Id = ${postId}`
      );
    return true;
  } catch (error) {
    submitErrorOperation(error);
    return false;
  }
}

async function removePostOperation(postId) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`delete Posts where Post_Id = ${postId}`);
    return true;
  } catch (error) {
    submitErrorOperation(error);
    return false;
  }
}

// TODO implement like dislike functonality
async function likePostOperation(postId, userId, isLiked) {
  try {
    let pool = await sql.connect(config);
    const likesRes = await pool
      .request()
      .query(
        `SELECT * from PostsToLikes WHERE Post_Id = ${postId} and User_Id = ${userId}`
      );
    const likes = likesRes.recordset;
    let message = "nothing";
    if (likes.length === 0) {
      await pool.request().query(
        `insert into PostsToLikes (Post_Id, User_Id, IsLiked)
              values (${postId}, ${userId}, ${isLiked})`
      );
      message = "inserted";
    } else {
      await pool
        .request()
        .query(
          `update PostsToLikes set IsLiked = ${isLiked} where Post_Id = ${postId} and User_Id = ${userId}`
        );
      message = "updated";
    }
    return message;
  } catch (error) {
    submitErrorOperation(error);
  }
}

async function getFriendsIdesOperation(userId) {
  try {
    let pool = await sql.connect(config);
    let friendIdes = [];
    const userWithFrinds = getUsersToFriendsOperation(userId);

    // take only id for earch user
    for (let index = 0; index < userWithFriends.length; index++) {
      if (userWithFriends[index].User_Id === userId) {
        friendIdes.push(userWithFriends[index].Friend_Id);
      } else {
        friendIdes.push(userWithFriends[index].User_Id);
      }
    }
    return friendIdes;
  } catch (error) {
    submitErrorOperation(error);
    return [];
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
}

module.exports = {
  getPostsByUserIdesOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  removePostOperation,
  getFriendsIdesOperation,
  likePostOperation,
};
