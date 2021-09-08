async function checkIfPostExistsDB(db,imageurl){
    const posts = db.get("posts").value();
    let dosePostExist = false;
    for (let i = 0; i < posts.length; i++) {
        post = posts[i];
        if(post[i].imageurl === imageurl){
          return true;
        }
      }
      return false;
}


async function removePostDB(db,imageurl){
    const users = db.get("posts").value();
    try {
      users.fillter(x => x.imageurl !== imageurl)
      db.write();
      return true;
    } catch (error) {
      console.log(error);
      return false
    }
}


async function addPostDB(db,imageurl){
const posts = db.get("posts").value();  
let post = "";
let dosePostExist = false
for(let i = 0; i< posts.length; i++){
    post = posts[i];
    if(post[i].imageurl === imageurl){
        dosePostExist = true;
        return dosePostExist;
    }
    try {
        posts.push({
            imageurl: imageurl,
            lat:lat,lan:lan,
            tags:tags,date:date,
            username:username});
            dosePostExist = false;
    } catch (error) {
        console.log(error);
        return -1;
    }
    db.write();
    return dosePostExist;
}

}


module.exports = {
    addPostDB,
    checkIfPostExistsDB,
    removePostDB
  };
  