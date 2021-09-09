async function checkIfPostExistsDB(db, imageurl) {
  const posts = db.get("posts").value();
  let dosePostExist = false;
  for (let i = 0; i < posts.length; i++) {
    post = posts[i];
    if (post[i].imageurl === imageurl) {
      return true;
    }
  }
  return false;
}

async function removePostDB(db, imageurl) {
  const users = db.get("posts").value();
  try {
    users.fillter((x) => x.imageurl !== imageurl);
    db.write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addPostDB(db, imageurl, lat, lan, tags, date, username) {
  const posts = db.get("posts").value();
  let dosePostExist = false;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].imageurl === imageurl) {
      dosePostExist = true;
      return dosePostExist;
    }
  }
  try {
    posts.push({
      imageurl: imageurl,
      lat: lat,
      lan: lan,
      tags: tags,
      date: new Date(),
      username: username,
    });
    dosePostExist = false;
  } catch (error) {
    console.log(error);
    return -1;
  }
  console.log("added post");
  db.write();
  return dosePostExist;
}

module.exports = {
  addPostDB,
  checkIfPostExistsDB,
  removePostDB,
};
