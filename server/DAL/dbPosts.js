const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { addPostDB,checkIfPostExistsDB , removePostDB } = require("./repository/posts.db");
const adapter = new FileSync("db.json");
const db = low(adapter);

async function addPost(imageurl, lat, lan, tags, date, username) {
  return await addPostDB(db, imageurl, lat, lan, tags, date, username);
}
async function checkIfPostExists(username, imageurl) {
  return checkIfPostExistsDB(db, username, imageurl);
}

async function removePost(imageurl){
  return removePostDB(db,imageurl);

}
module.exports = {
  checkIfPostExists,
  addPost,
  removePost,
};
