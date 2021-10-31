import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  axiosAddComment,
  getCommentsForPost,
} from "../../services/comments/comments.axios";

const Comments = ({ postId, currentUserId }: any) => {
  const [backendComments, setBackendComments] = useState<any>([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments
    .filter(
      (backendComment: any) =>
        backendComment.parentId === null ||
        backendComment.parentId === undefined
    )
    .sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  const getReplies = (commentId: any) => {
    const replies = backendComments
      .filter((backendComment: any) => backendComment.parentId === commentId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    return replies;
  };
  const addComment = async (text: any, parentId: any) => {
    const commentFromServer = await axiosAddComment(postId, text, parentId);
    const comment = apiCommentToComment(commentFromServer);

    setBackendComments([comment, ...backendComments]);
    setActiveComment(null);
  };

  function apiCommentToComment(apiComment: any) {
    return {
      id: apiComment.Comment_Id,
      post_id: apiComment.Post_Id,
      body: apiComment.Text,
      username: "Username",
      userId: apiComment.User_Id,
      parentId: null,
      createdAt: apiComment.CreatedAt,
    };
  }

  useEffect(() => {
    const getCommentsFromServer = async () => {
      let commentsFromServer: any = [];
      commentsFromServer = await getCommentsForPost(postId);

      let comments: any[] = [];
      if (commentsFromServer) {
        commentsFromServer.forEach((comment: any) => {
          comments.push(apiCommentToComment(comment));
        });
      }

      setBackendComments(comments);
    };
    getCommentsFromServer();
  }, []);

  const deleteComment = () => {
    console.log("not implemented yet");
  };
  const updateComment = () => {
    console.log("not implemented yet");
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write a comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment: any) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
