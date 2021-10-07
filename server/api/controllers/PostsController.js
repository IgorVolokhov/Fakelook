const {
  getPostsByUserIdes,
  getPostById,
  addPost,
  editPost,
} = require("../../DAL/dbPosts");

const friends = {
  igor: [5, 6],
  liel: [4, 6],
  eyal: [4, 5],
};

module.exports = {
  getAllPostsForUserByUserIdes: async (req, res) => {
    const userId = req.body.User_Id;
    const userIdes = [userId, ...friends.igor];
    console.log("these are the ides: ", userIdes);
    const posts = await getPostsByUserIdes(userIdes);
    console.log(posts);
    res.status(200).json({
      message: posts ? `Got posts` : `Didn't get posts`,
      posts: posts,
    });
  },

  getOnlyUserPosts: async (req, res) => {
    const userId = req.body.User_Id;
    const userIdes = [userId];
    console.log("these are the ides: ", userIdes);
    const posts = await getPostsByUserIdes(userIdes);
    console.log(posts);
    res.status(200).json({
      message: posts ? `Got posts` : `Didn't get posts`,
      posts: posts,
    });
  },

  getOnlyFriendsPosts: async (req, res) => {
    const userIdes = [...friends.igor];
    console.log("these are the ides: ", userIdes);
    const posts = await getPostsByUserIdes(userIdes);
    console.log(posts);
    res.status(200).json({
      message: posts ? `Got posts` : `Didn't get posts`,
      posts: posts,
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
    console.log("in add post: ", req.body);
    const { User_Id, image_src, lat, lon, description, tags } = req.body;
    const isAdded = await addPost(
      User_Id,
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
};
