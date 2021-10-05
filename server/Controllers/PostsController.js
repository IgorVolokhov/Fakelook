const {
  getAllPosts,
  getPostsByUserId,
  getSmallerPostsByUser,
  getPostById,
  addPost,
  editPost,
  removePost,
  getAllPostsFromUserFriends,
} = require("../DAL/dbPosts");

module.exports = {
  
  getAllPosts: async (req, res) => {
    const getPosts = await getAllPosts();
    res.status(200).json({
      message: getPosts ? `Got posts` : `Didn't get posts`,
      posts: gotPosts,
    });
  },

  getPostForUser: async (req, res) => {
    const gotPosts = await getPostsByUserId(req.body.userId);
    res.status(200).json({
      message: gotPosts ? `Got posts` : `Didn't get posts`,
      posts: gotPosts,
    });
  },

  getAllPostsFromUserFriends: async (req, res) => {
    const gotPosts = await getAllPostsFromUserFriends(req.body.userId);
    res.status(200).json({
      message: gotPosts ? `Got Posts` : `Didn't Get Posts`,
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
    const { userId, image_src, lat, lon, description, tags } = req.body;
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
    const { postId, lat, lon, description, tags } = req.body;
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
