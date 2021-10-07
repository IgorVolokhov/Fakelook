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
    console.log("this is body: ", req.body);
    const { User_Id, postId, text, parentId } = req.body;
    const { comment, isSuccessful } = await addCommentForPost(
      User_Id,
      postId,
      text,
      parentId
    );
    if (isSuccessful) {
      res.status(200).json({
        comment: comment,
        isSuccessful: isSuccessful,
      });
    }
    // if was not successful comment will be null which still can be sent and work with that but need to show different status, do not know them good so will leave this at that for now
    else {
      res.status(400).json({
        comment: null,
        isSuccessful: isSuccessful,
      });
    }
  },

  editCommentForPost: async (req, res) => {
    const { commentId, text } = req.body;
    const isEdited = await editCommentForPost(commentId, text);
    res.status(200).json({
      message: isEdited ? `Edited comment` : `Some error`,
    });
  },
};
