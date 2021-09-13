const config = require("../dbconfig");
const sql = require("mssql");

async function getPostsByUser(userId) {
  try {
    let pool = await sql.connect(config);
    let posts = await pool
      .request()
      .query(`SELECT * from Posts where User_Id = ${userId}`);
    return posts;
  } catch (error) {
    console.log(error);
  }
}

async function getSmallerPostsByUser(userId) {
  try {
    let pool = await sql.connect(config);
    let posts = await pool
      .request()
      .query(
        `SELECT User_Id, Image_Src, Lat, Lon from Posts where User_Id = ${userId}`
      );
    return posts;
  } catch (error) {
    console.log(error);
  }
}

async function getPostById(postId) {
  try {
    let pool = await sql.connect(config);
    let post = await pool
      .request()
      .query(`SELECT * from Posts where Post_Id = ${postId}`);
    return post;
  } catch (error) {
    console.log(error);
  }
}

async function addPost(
  userId,
  image_src,
  lat,
  lon,
  description = null,
  tags = null
) {
  try {
    let pool = await sql.connect(config);

    // cant insert string values without '' around them but can insert just null quick fix
    if (description !== null) {
      description = `'${description}'`;
    }
    if (tags !== null) {
      tags = `'${tags}'`;
    }
    await pool.request().query(
      `insert into Posts (User_Id, Image_Src, Lat, Lon, Likes, Dislikes, Description, Tags) 
            values (${userId}, '${image_src}', ${lat}, ${lon}, 0, 0, ${description}, ${tags})`
    );
  } catch (error) {
    console.log(error);
  }
}

async function editPost(postId, description = null, tags = null) {
  try {
    let pool = await sql.connect(config);

    // cant insert string values without '' around them but can insert just null quick fix
    if (description !== null) {
      description = `'${description}'`;
    }
    if (tags !== null) {
      tags = `'${tags}'`;
    }
    // update comments set Likes = Likes + ${addOrRemove} where Comment_Id = ${commentId}
    await pool
      .request()
      .query(
        `update Posts set Description = ${description}, Tags = ${tags} where Post_Id = ${postId}`
      );
  } catch (error) {
    console.log(error);
  }
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
  getPostsByUser,
  addPost,
  getSmallerPostsByUser,
  getPostById,
  editPost,
};
