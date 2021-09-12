const {
  addPost,
  editPost,
  removePost,
  getPosts,
  getPostsByUser,
} = require("../DAL/dbPosts");

module.exports = {
  get: async (req, res) => {
    const gotPosts = await getPosts();
    res.status(200).json({
      message: gotPosts ? `Got books` : `Didn't get books`,
    });
  },

  add: async (req, res) => {
    const isAdded = await addPost(req.body);
    res.status(200).json({
      message: isAdded ? `added successfully` : `didnt add`,
    });
  },

  remove: async (req, res) => {
    const isRemoved = await removePost(req.body.postId);
    res.status(200).json({
      message: isRemoved ? `remove successfully` : `didnt remove`,
    });
  },

  edit: async (req, res) => {
    const isEdited = await editPost(req.body);
    res.status(200).json({
      message: isEdited ? `Post eddited successfully` : `Edit failed`,
    });
  },

  getPostsById: async (req, res) => {
    const gotPosts = await getPostsByUser(req.body);
    res.status(200).json({
      message: gotPosts ? `Got posts by user` : `Didn't get posts by user`,
    });
  },
};
