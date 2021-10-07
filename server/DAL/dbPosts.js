const {
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  getPostsByUserIdesOperation,
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
    return false;
    //return await rep.removePostDB(postId);
  }
}
module.exports = new DBPosts();
