import axios from "axios";

const url = "http://localhost:3001/comments";

// todo make interface for posts for map and not any
export const getCommentsForPost = async (postId: any) => {
  let comments;
  await axios.post(`${url}/getcommentsforpost`, { postId }).then((res) => {
    comments = res.data.comments;
  });
  return comments;
};

export const addComment = async (userId: any, postId: any, text: string) => {
  if (!isTextFilled(text)) {
    return "text is not filled properly";
  }
  let message;

  await axios
    .post(`${url}/addcommentforpost`, {
      userId,
      postId,
      text,
    })
    .then((res) => {
      message = res.data.message;
    });
  return message;
};

export const editComment = async (commentId: any, text: string) => {
  if (!isTextFilled(text)) {
    return "text is not filled properly";
  }
  let message;

  await axios
    .patch(`${url}/editcommentforpost`, {
      commentId,
      text,
    })
    .then((res) => {
      message = res.data.message;
    });
  return message;
};

function isTextFilled(text: string): boolean {
  if (text === undefined) {
    return false;
  }
  for (let index = 0; index < text.length; index++) {
    if (text[index] !== " ") {
      return true;
    }
  }
  return false;
}
