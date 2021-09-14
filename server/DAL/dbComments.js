const {
  getCommentsForPostOperation,
  addCommentOperation,
  editCommentOperation,
} = require("../Sql/dummy_dboperations/commentOperations");

class DBPosts {
  async getCommentsForPost(postId) {
    return await getCommentsForPostOperation(postId);
  }

  async addCommentForPost(userId, postId, text) {
    return await addCommentOperation(userId, postId, text);
  }

  async editCommentForPost(commentId, text) {
    return await editCommentOperation(commentId, text);
  }
}
module.exports = new DBPosts();
