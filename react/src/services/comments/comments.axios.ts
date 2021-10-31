import axios from "axios";
import { getAccessToken } from "../tokens";

const url = `http://localhost:${process.env.PORT_COMMENTS || 3004}/comments/`;

// todo make interface for posts for map and not any
export const getCommentsForPost = async (postId: number) => {
  let comments;
  await axios
    .post(`${url}/getcommentsforpost`, { token: getAccessToken(), postId })
    .then((res) => {
      comments = res.data.comments;
    });
  return comments;
};

export const axiosAddComment = async (
  postId: number,
  text: string,
  parentId: number
) => {
  if (!isTextFilled(text)) {
    return "text is not filled properly";
  }
  let message: any;

  await axios
    .post(`${url}/addcommentforpost`, {
      token: getAccessToken(),
      postId,
      text,
      parentId,
    })
    .then((res) => {
      message = res.data;
    });
  if (message && message.isSuccessful) {
    return message.comment;
  }
  return null;
};

export const editComment = async (commentId: any, text: string) => {
  if (!isTextFilled(text)) {
    return "text is not filled properly";
  }
  let message;

  await axios
    .patch(`${url}/editcommentforpost`, {
      token: getAccessToken(),
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
