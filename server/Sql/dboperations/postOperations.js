const config = require("../dbconfig");
const sql = require("mssql");
const {
  turnStringSuitableForSql,
  getToDayDate,
} = require("../../utils/sqlFormating");

async function getPostsByUserIdesOperation(userIdes) {
  try {
    let pool = await sql.connect(config);
    const userIdesForSql = userIdesToSqlUserIdes(userIdes);
    console.log("user ides from client: ", userIdes);
    console.log(userIdesForSql);
    let posts = await pool
      .request()
      .query(`SELECT * from Posts WHERE User_Id In (${userIdesForSql})`);
    return posts.recordsets[0].length > 0 ? posts.recordsets[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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
  console.log("in add post operation");
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
    console.log(error);
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
    return false;
  }
}

// todo implement like dislike functonality
async function likePost(commentId, isLiked) {
  try {
    let pool = await sql.connect(config);
    const addOrRemove = isLiked ? 1 : -1;
    await pool
      .request()
      .query(
        `update comments set Likes = Likes + ${addOrRemove} where Comment_Id = ${commentId}`
      );
  } catch (error) {
    console.log(error);
  }
}

async function dislikeComment(commentId, isDisliked) {
  try {
    let pool = await sql.connect(config);
    const addOrRemove = isDisliked ? 1 : -1;
    await pool
      .request()
      .query(
        `update comments set Dislikes = Dislikes + ${addOrRemove} where Comment_Id = ${commentId}`
      );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  getPostsByUserIdesOperation,
};
