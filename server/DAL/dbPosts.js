const {
  addPost,
  getPostsByUser,
  getPostById,
  editPost,
  getSmallerPostsByUser,
} = require("../Sql/dboperations/postOperations");

class DBPosts {
  async addPost(userId, image_src, lat, lon, description = null, tags = null) {
    return await addPost(
      userId,
      image_src,
      lat,
      lon,
      (description = null),
      (tags = null)
    );
  }

  async removePost(postId) {
    // return await rep.removePostDB(postId);
  }

  async getPost(postId) {
    return await getPostById(postId);
  }

  async editPost(postId, description = null, tags = null) {
    return await editPost(postId, (description = null), (tags = null));
  }

  async getPostsByUser(userId) {
    return await getPostsByUser(userId);
    // return await rep.getPostsByUserDB(user);
  }

  async getSmallerPostsByUser(userId) {
    return await getSmallerPostsByUser(userId);
  }
}
module.exports = new DBPosts();
