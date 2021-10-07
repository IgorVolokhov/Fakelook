const {
  getAllPostsOperation,
  getAllPostsFromUserFriendsOperation,
  getPostsByUserIdOperation,
  getSmallerPostsByUserOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  removePostOperation,
  likePostOperation
} = require("../Sql/dummy_dboperations/postOperations");

class DBPosts {

  async getAllPosts() {
    return await getAllPostsOperation();
  }

  async getAllPostsFromUserFriends(userId) {
    return await getAllPostsFromUserFriendsOperation(userId);
  }

  async getPostsByUserId(userId) {
    return await getPostsByUserIdOperation(userId);
  }

  async getSmallerPostsByUser(userId) {
    return await getSmallerPostsByUserOperation(userId);
  }

  async getPostById(postId) {
    return await getPostByIdOperation(postId);
  }

  async addPost(userId, image_src, lat, lon, description = null, tags = null) {
    return await addPostOperation(
      userId,
      image_src,
      lat,
      lon,
      description,
      tags
    );
  }

  async editPost(postId, lat, lon, description = null, tags = null) {
    return await editPostOperation(postId, lat, lon, description, tags);
  }

  async removePost(postId) {
    return await removePostOperation(postId);
  }
}
module.exports = new DBPosts();
