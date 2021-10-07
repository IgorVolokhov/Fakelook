const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const { uniqueId } = require("../../utils/uniqueId");

async function likePostOperation(postId, isLiked) {
  try {
    const posts = db.get("posts").value();
    let post = posts.filer((x) => x.postId === postId);
    if (isLiked) post.likes--;
    else post.likes++;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPostsOperation() {
  try {
    const posts = db.get("posts").value();
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPostsByUserIdOperation(userId) {
  try {
    const posts = db.get("posts").value();
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPostsByUserIdOperation(userId) {
  try {
    const posts = db.get("posts").value();
    console.log("user id: ", userId);
    return posts.length > 0
      ? posts.filter((post) => post.User_Id === userId)
      : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// in dummy_dboperations the same as above in with real sql it return much smaller data
async function getSmallerPostsByUserOperation(userId) {
  try {
    const posts = db.get("posts").value();
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPostByIdOperation(postId) {
  try {
    const posts = db.get("posts").value();
    let post;
    for (let index = 0; index < posts.length; index++) {
      if (posts[index].Post_Id === postId) {
        post = posts[index];
      }
    }
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addPostOperation(
  userId,
  image_src,
  lat,
  lon,
  description = null,
  tags = null
) {
  try {
    const posts = db.get("posts").value();

    description = turnStringSuitableForSql(description);
    tags = turnStringSuitableForSql(tags);

    posts.push({
      Post_Id: uniqueId(),
      User_Id: userId,
      Image_Src: image_src,
      Lat: lat,
      Lon: lon,
      Description: description,
      Tags: tags,
    });
    db.write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removePostOperation(postId) {
  try {
    console.log("GOT TO REMOVEPO", postId);
    posts = db.get("posts").value();
    for (let index = 0; index < posts.length; index++) {
      if (posts[index].Post_Id === postId) {
        posts.splice(index, 1);
        break;
      }
    }
    db.write();
    return true;
  } catch (error) {
    return false;
  }
}

async function editPostOperation(
  postId,
  lat,
  lon,
  description = null,
  tags = null
) {
  try {
    const posts = db.get("posts").value();

    description = turnStringSuitableForSql(description);
    tags = turnStringSuitableForSql(tags);

    for (let index = 0; index < posts.length; index++) {
      if (posts[index].Post_Id === postId) {
        posts[index].Lat = lat;
        posts[index].Lon = lon;
        posts[index].Description = description;
        posts[index].Tags = tags;
      }
    }
    db.write();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function turnStringSuitableForSql(someString) {
  return someString !== null ? `'${someString}'` : someString;
}

// isLiked is if user liked this comment or removed his like same for isDisliked
async function likePost(commentId, isLiked) {
  try {
    let pool = await sql.connect(config);
    const addOrRemove = isLiked ? 1 : -1;
    await pool
      .request()
      .query(
        `update comments set Likes = Likes + ${addOrRemove} where Comment_Id = ${commentId}`
      );
  } catch (error) {
    console.log(error);
  }
}

async function dislikeComment(commentId, isDisliked) {
  try {
    let pool = await sql.connect(config);
    const addOrRemove = isDisliked ? 1 : -1;
    await pool
      .request()
      .query(
        `update comments set Dislikes = Dislikes + ${addOrRemove} where Comment_Id = ${commentId}`
      );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllPostsOperation,
  getPostsByUserIdOperation,
  getSmallerPostsByUserOperation,
  getPostByIdOperation,
  addPostOperation,
  editPostOperation,
  removePostOperation,
};
