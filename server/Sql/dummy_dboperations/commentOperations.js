const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const { uniqueId } = require("../../utils/uniqueId");

async function getCommentsForPostOperation(postId) {
  try {
    const comments = db.get("comments").value();
    let commentsRes = [];
    for (let index = 0; index < comments.length; index++) {
      if ((comments[index].Post_Id = postId)) {
        commentsRes.push(comments[index]);
      }
    }
    return commentsRes.length > 0 ? commentsRes : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addCommentOperation(userId, postId, text, parentId) {
  try {
    const comments = db.get("comments").value();
    const comment = {
      Comment_Id: uniqueId(),
      User_Id: userId,
      Post_Id: postId,
      Parent_Id: parentId,
      Text: text,
      createdAt: new Date().toString(),
    };
    comments.push(comment);
    db.write();
    return { comment: comment, isSuccessful: true };
  } catch (error) {
    console.log(error);
    return { isSuccessful: true };
  }
}

async function editCommentOperation(commentId, text) {
  try {
    const comments = db.get("comments").value();
    for (let index = 0; index < comments.length; index++) {
      if (comments[index].Comment_Id === commentId) {
        comments[index].Text = text;
        break;
      }
    }
    db.write();
    return true;
  } catch (error) {
    console.log(error);
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
  getCommentsForPostOperation,
  addCommentOperation,
  editCommentOperation,
};
