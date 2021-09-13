const config = require("../dbconfig");
const sql = require("mssql");

async function getCommentsForPost(postId) {
  try {
    let pool = await sql.connect(config);
    let comments = await pool
      .request()
      .query(`SELECT * from comments where Post_Id = ${postId}`);
    return comments;
  } catch (error) {
    console.log(error);
  }
}

async function addComment(userId, postId, text) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(
      `insert into comments (User_Id, Post_Id, Likes, Dislikes, Text) 
            values (${userId}, '${postId}', 0, 0, '${text}')`
    );
  } catch (error) {
    console.log(error);
  }
}

// todo is there a reason to add user and post id if each comment ever has unique id?
async function editComment(commentId, text) {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `update comments set Text = '${text}' where Comment_Id = ${commentId}`
      );
  } catch (error) {
    console.log(error);
  }
}

// todo like and dislikes need a rework from sql to work properly
// isLiked is if user liked this comment or removed his like same for isDisliked
async function likeComment(commentId, isLiked) {
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
  getCommentsForPost,
  addComment,
  editComment,
};
