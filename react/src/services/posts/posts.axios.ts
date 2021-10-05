import axios from "axios";
import { Post } from "../../classes/post";

const url = "http://localhost:3001/posts";

// todo make interface for posts for map and not any

export const getPosts = async () => {
  let posts;
  await axios.post(`${url}/getallposts`).then((res) => {
    posts = res.data.posts;
  });
  return posts;
};

export const getPostsByUserId = async (userId: any) => {
  let posts;
  await axios.post(`${url}/getpostsforuser`, { userId }).then((res) => {
    posts = res.data.posts;
  });
  return posts;
};

export const getSmallerPostsByUser = async (userId: any) => {
  let posts;
  await axios.post(`${url}/getsmallerpostforuser`, { userId }).then((res) => {
    posts = res.data.posts;
  });
  return posts;
};

export const getPostById = async (postId: any) => {
  let post;
  await axios.post(`${url}/getpostbyid`, { postId }).then((res) => {
    post = res.data.post;
  });
  return post;
};

export const addPost = async (
  userId: any,
  image_src: string,
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
      userId,
      image_src,
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
