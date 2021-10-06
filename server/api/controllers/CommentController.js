const {
  getCommentsForPost,
  addCommentForPost,
  editCommentForPost,
} = require("../../DAL/dbComments");

module.exports = {
  getCommentsForPost: async (req, res) => {
    const comments = await getCommentsForPost(req.body.postId);
    res.status(200).json({
      message: comments ? `Got comments` : `Didn't get comments`,
      comments: comments,
    });
  },

  addCommentForPost: async (req, res) => {
    const { userId, postId, text } = req.body;
    const isAdded = await addCommentForPost(userId, postId, text);
    res.status(200).json({
      message: isAdded ? `Added comment` : `Some error`,
    });
  },

  editCommentForPost: async (req, res) => {
    const { commentId, text } = req.body;
    const isEdited = await editCommentForPost(commentId, text);
    res.status(200).json({
      message: isEdited ? `Edited comment` : `Some error`,
    });
  },
};
