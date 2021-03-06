const {
  getCommentsForPostOperation,
  addCommentOperation,
  editCommentOperation,
  likeCommentOperation,
} = require("../Sql/dboperations/commentOperations");

class DBPosts {
  async getCommentsForPost(postId) {
    return await getCommentsForPostOperation(postId);
  }

  async addCommentForPost(userId, postId, text, parentId) {
    return await addCommentOperation(userId, postId, text, parentId);
  }

  async editCommentForPost(commentId, text) {
    return await editCommentOperation(commentId, text);
  }

  async likeComment(commentId, userId, isLiked) {
    return await likeCommentOperation(commentId, userId, isLiked);
  }
}
module.exports = new DBPosts();
