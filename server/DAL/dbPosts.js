const {
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
<<<<<<< HEAD
  removePostOperation,
  likePostOperation
} = require("../Sql/dummy_dboperations/postOperations");
=======
  getPostsByUserIdesOperation,
} = require("../Sql/dboperations/postOperations");
>>>>>>> 88f139f57531eee63bbf7d2b770a17cee60fcdd4

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
}
module.exports = new DBPosts();
