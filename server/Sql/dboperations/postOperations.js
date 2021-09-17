const config = require("../dbconfig");
const sql = require("mssql");

async function getAllPostsFromUserFriendsOperation(userId) {
  //WILL IMPLEMENT POSTS BY THE USER'S FRIENDS LATER!
  try {
    let pool = await sql.connect(config);
    let posts = await pool.request().query(`SELECT * from Posts`);
    return posts.recordsets[0].length > 0 ? posts.recordsets[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPostsByUserIdOperation(userId) {
  try {
    let pool = await sql.connect(config);
    let posts = await pool
      .request()
      .query(`SELECT * from Posts where User_Id = ${userId}`);
    return posts.recordsets[0].length > 0 ? posts.recordsets[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getSmallerPostsByUserOperation(userId) {
  try {
    let pool = await sql.connect(config);
    let posts = await pool
      .request()
      .query(
        `SELECT User_Id, Image_Src, Lat, Lon from Posts where User_Id = ${userId}`
      );
    return posts.recordsets[0].length > 0 ? posts.recordsets[0] : null;
  } catch (error) {
    console.log(error);
  }
}

async function getPostByIdOperation(postId) {
  try {
    let pool = await sql.connect(config);
    let post = await pool
      .request()
      .query(`SELECT * from Posts where Post_Id = ${postId}`);
    return post.recordsets[0].length > 0 ? post.recordsets[0][0] : null;
  } catch (error) {
    console.log(error);
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

    await pool.request().query(
      `insert into Posts (User_Id, Image_Src, Lat, Lon, Likes, Dislikes, Description, Tags) 
            values (${userId}, '${image_src}', ${lat}, ${lon}, 0, 0, ${description}, ${tags})`
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
        `update Posts set Lat = ${lat}, Lon = ${lon}, Description = ${description}, Tags = ${tags} where Post_Id = ${postId}`
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function turnStringSuitableForSql(someString) {
  return someString !== null ? `'${someString}'` : someString;
}

// isLiked is if user liked this comment or removed his like same for isDisliked
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
  getPostsByUserIdOperation,
  getSmallerPostsByUserOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  getAllPostsFromUserFriendsOperation
};
