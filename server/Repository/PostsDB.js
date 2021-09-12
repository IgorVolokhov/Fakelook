const jsonFileName = "./Data/Posts.json";
const { uniqueId } = require("../utils/uniqueId");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class PostsRepository {
  async getPosts() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  }

  async editPostDB(post) {
    let data = JSON.parse(await readFile(jsonFileName));
    data = data.filter((q) => q.id !== post.postId);
    data.push(post);
    await writeFile(jsonFileName, JSON.stringify(data));
  }

  async removePostDB(postId) {
    try {
      let data = JSON.parse(await readFile(jsonFileName));
      data = data.filter((x) => x.id !== postId);
      await writeFile(jsonFileName, JSON.stringify(data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addPostDB(post) {
    console.log({ post });
    try {
      let data = JSON.parse(await readFile(jsonFileName));
      data.push({
        id: uniqueId(),
        lat: post.lat,
        lan: post.lan,
        tags: post.tags,
        date: post.date,
        username: post.username,
      });
      await writeFile(jsonFileName, JSON.stringify(data));
    } catch {
      console.log("error");
      return -1;
    }

    return true;
  }

  async getPostsByUserDB(user) {
    let data = fs.readFileSync(jsonFileName);
    data = data.filter((x) => x.username === user.username);
    return data;
  }
}

module.exports = new PostsRepository();
