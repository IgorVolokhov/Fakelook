const {
  getPostsByUserIdes,
  getPostById,
  addPost,
  editPost,
  removePost,
  likePost,
  getUsersToFriends,
} = require("../../DAL/dbPosts");

async function findFriendsIdes(userId) {
  const friends = await getUsersToFriends(userId);
  let usersFriends = [];
  for (let index = 0; index < friends.length; index++) {
    if (friends[index].User_Id === userId) {
      usersFriends.push(friends[index].Friend_Id);
    } else {
      usersFriends.push(friends[index].User_Id);
    }
  }

  return usersFriends;
}

module.exports = {
  getAllPostsForUserByUserIdes: async (req, res) => {
    const userId = req.body.User_Id;
    let usersFriends = await findFriendsIdes(userId);

    const userIdes = [userId, ...usersFriends];
    const posts = await getPostsByUserIdes(userIdes);
    res.status(200).json({
      message: posts ? `Got posts` : `Didn't get posts`,
      posts: posts,
    });
  },

  getOnlyUserPosts: async (req, res) => {
    const userId = req.body.User_Id;
    const userIdes = [userId];
    const posts = await getPostsByUserIdes(userIdes);
    res.status(200).json({
      message: posts ? `Got posts` : `Didn't get posts`,
      posts: posts,
    });
  },

  getOnlyFriendsPosts: async (req, res) => {
    const userId = req.body.User_Id;
    const usersFriends = await findFriendsIdes(userId);

    const userIdes = [...usersFriends];
    const posts = await getPostsByUserIdes(userIdes);
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

  like: async (req, res) => {
    const { postId, User_Id, isLiked } = req.body;
    const likePostRes = await likePost(postId, User_Id, isLiked);
    res.status(200).json({
      message: likePostRes ? likePostRes : "got nothing",
    });
  },
};
