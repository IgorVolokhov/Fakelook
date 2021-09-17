const {
  getAllPostsFromUserFriendsOperation,
  getPostsByUserIdOperation,
  getSmallerPostsByUserOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
} = require("../Sql/dummy_dboperations/postOperations");

class DBPosts {

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
    return false;
    //return await rep.removePostDB(postId);
  }
}
module.exports = new DBPosts();
