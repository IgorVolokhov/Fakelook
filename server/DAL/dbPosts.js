const {
  getPostsByUserIdesOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  removePostOperation,
  getFriendsIdesOperation,
} = require("../Sql/dboperations/postOperations");

class DBPosts {
  async getPostsByUserIdes(userIdes) {
    return await getPostsByUserIdesOperation(userIdes);
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

  async getFriendsIdes(userId) {
    return await getFriendsIdesOperation(userId);
  }
}
module.exports = new DBPosts();
