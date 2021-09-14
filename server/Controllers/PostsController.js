const {
  getPostsByUserId,
  getSmallerPostsByUser,
  getPostById,
  addPost,
  editPost,
  removePost,
} = require("../DAL/dbPosts");

module.exports = {
  getPostForUser: async (req, res) => {
    const gotPosts = await getPostsByUserId(req.body.userId);
    res.status(200).json({
      message: gotPosts ? `Got posts` : `Didn't get posts`,
      posts: gotPosts,
    });
  },

  getSmallerPostsForUser: async (req, res) => {
    const gotPosts = await getSmallerPostsByUser(req.body.userId);
    res.status(200).json({
      message: gotPosts ? `Got books` : `Didn't get books`,
      posts: gotPosts,
    });
  },

  getPostById: async (req, res) => {
    const gotPost = await getPostById(req.body.postId);
    res.status(200).json({
      message: gotPost ? `Got post` : `Didn't get post`,
      post: gotPost,
    });
  },

  add: async (req, res) => {
    console.log(req.body);
    const {
      userId,
      image_src,
      lat,
      lon,
      description = null,
      tags = null,
    } = req.body;
    const isAdded = await addPost(
      userId,
      image_src,
      lat,
      lon,
      description,
      tags
    );
    res.status(200).json({
      message: isAdded ? `added successfully` : `didnt add`,
    });
  },

  edit: async (req, res) => {
    console.log(req.body);
    const { postId, lat, lon, description = null, tags = null } = req.body;
    const isEdited = await editPost(postId, lat, lon, description, tags);
    res.status(200).json({
      message: isEdited ? `Post eddited successfully` : `Edit failed`,
    });
  },

  remove: async (req, res) => {
    const isRemoved = await removePost(req.body.postId);
    res.status(200).json({
      message: isRemoved ? `remove successfully` : `didnt remove`,
    });
  },

  getPostsById: async (req, res) => {
    const gotPosts = await getPostsByUserId(req.body);
    res.status(200).json({
      message: gotPosts ? `Got posts by user` : `Didn't get posts by user`,
    });
  },
};
