import axios from "axios";
import { Post } from "../../classes/post";
import { getAccessToken } from "../tokens";

const url = `http://localhost:${process.env.PORT_POSTS || 3003}/posts/`;

// todo make interface for posts for map and not any

// works
export const getAllPostsForUser = async () => {
  let posts = [""];
  await axios
    .post(`${url}/getallpostsforuseranduserfriends`, {
      token: getAccessToken(),
    })
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

export const removePost = async (post: any) => {
  const postId = post.Post_Id;
  let message;
  await axios
    .delete(`${url}/removepost`, {
      data: { token: getAccessToken(), postId: postId },
    })
    .then((res) => {
      message = res.data.message;
    });

  return message;
};

export const getOnlyUserPosts = async () => {
  let posts;
  await axios
    .post(`${url}/getonlyuserposts`, { token: getAccessToken() })
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

export const getOnlyFriendsPosts = async () => {
  let posts;
  await axios
    .post(`${url}/getonlyfriendsposts`, { token: getAccessToken() })
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

export const getPostById = async (postId: any) => {
  let post;
  await axios
    .post(`${url}/getpostbyid`, { token: getAccessToken(), postId })
    .then((res) => {
      post = res.data.post;
    });
  return post;
};

export const addPost = async (
  image_src: FormData,
  lat: number,
  lon: number,
  description: string = "",
  tags: string = ""
) => {
  let message;

  const descriptionToInsert = makeNotInsertedFieldNull(description);
  const tagsToInsert = makeNotInsertedFieldNull(tags);

  await axios
    .post(`${url}/addpost`, {
      token: getAccessToken(),
      image_src: image_src,
      lat,
      lon,
      description: descriptionToInsert,
      tags: tagsToInsert,
    })
    .then((res) => {
      message = res.data.message;
    });
  return message;
};

export const editPost = async (
  postId: any,
  lat: number,
  lon: number,
  description: string = "",
  tags: string = ""
) => {
  let message;

  const descriptionToInsert = makeNotInsertedFieldNull(description);
  const tagsToInsert = makeNotInsertedFieldNull(tags);

  await axios
    .patch(`${url}/editpost`, {
      token: getAccessToken(),
      postId,
      lat,
      lon,
      description: descriptionToInsert,
      tags: tagsToInsert,
    })
    .then((res) => {
      message = res.data.message;
    });
  return message;
};

function makeNotInsertedFieldNull(value: string): string | null {
  return value === "" ? null : value;
}
