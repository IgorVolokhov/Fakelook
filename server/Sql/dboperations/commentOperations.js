const { submitErrorOperation } = require ('../dummy_dboperations/errorsOperation');
const config = require("../dbconfig");
const sql = require("mssql");
const {
  turnStringSuitableForSql,
  getToDayDate,
  dateToYYMMDD,
} = require("../../utils/sqlFormating");

async function getCommentsForPostOperation(postId) {
  try {
    console.log("i am in get comments by id: ", postId);
    let pool = await sql.connect(config);
    let comments = await pool
      .request()
      .query(`SELECT * from Comments where Post_Id = ${postId}`);
    return comments.recordsets[0].length > 0 ? comments.recordsets[0] : null;
  } catch (error) {
    submitErrorOperation(error);
    return null;
  }
}

async function addCommentOperation(userId, postId, text, parentId) {
  try {
    let pool = await sql.connect(config);
    if (!parentId) {
      parentId = null;
    }

    const textToSql = turnStringSuitableForSql(text);
    const date = getToDayDate();
    const dateToSql = turnStringSuitableForSql(date);
    await pool.request().query(
      `insert into comments (User_Id, Post_Id, Parent_Id, Text, CreatedAt)
            values (${userId}, ${postId}, ${parentId}, ${textToSql}, ${dateToSql})`
    );
    const comments = await pool
      .request()
      .query(`SELECT * from Comments where User_Id = ${userId}`);
    let comment = "";
    for (let index = 0; index < comments.recordset.length; index++) {
      if (
        comments.recordset[index].Post_Id === postId &&
        comments.recordset[index].Text === text &&
        comments.recordset[index].Parent_Id === parentId
      ) {
        const dateFromSql = comments.recordset[index].CreatedAt;
        const dateFromSqlString = new Date(dateFromSql.toString());
        if (date === dateToYYMMDD(dateFromSqlString)) {
          comment = comments.recordset[index];
          break;
        }
      }
    }

    return { comment: comment, isSuccessful: true };
  } catch (error) {
    submitErrorOperation(error);
    return { isSuccessful: true };
  }
}

async function editCommentOperation(commentId, text) {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `update comments set Text = '${text}' where Comment_Id = ${commentId}`
      );
    return true;
  } catch (error) {
    submitErrorOperation(error);
    return false;
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
    submitErrorOperation(error);
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
    submitErrorOperation(error);
  }
}

module.exports = {
  getCommentsForPostOperation,
  addCommentOperation,
  editCommentOperation,
};
