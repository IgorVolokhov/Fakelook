const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const rep = require("../Repository/PostsDB");
const adapter = new FileSync("../Data/Posts");

class DBPosts {
  async addPost(post) {
    return await rep.addPostDB(post);
  }

  async checkIfPostExists(username, imageurl) {
    return await rep.checkIfPostExistsDB(username, imageurl);
  }

  async removePost(postId) {
    return await rep.removePostDB(postId);
  }

  async getPost(userId) {
    return await rep.getPostsDB(userId);
  }

  async editPost(post) {
    return await rep.editPostDB(post);
  }

  async getPostsByUser(user) {
    return await rep.getPostsByUserDB(user);
  }

  async getPosts() {
    return await rep.getPosts();
  }
}
module.exports = new DBPosts();
