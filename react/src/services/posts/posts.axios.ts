import axios from "axios";
import { Post } from "../../classes/post";
import { getAccessToken } from "../tokens";

const url = "http://localhost:3001/posts";

// todo make interface for posts for map and not any

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

<<<<<<< HEAD
export const getAllPosts = async () => {
  let posts;
  await axios.post(`${url}/getallposts`).then((res) => {
    posts = res.data.posts;
  });
  return posts;
};

export const removePost = async (post: any) => {
  console.log(post);
  
  var postId = post.Post_Id;
  let message;    
  await axios
    .post(`${url}/removepost`, { token: getAccessToken(), postId: postId })
    .then((res) => {
      message = res.data.message;
    });

  return message;
};

// todo make interface for posts for map and not any
export const getPostsByUserId = async () => {
  let posts;
  await axios
    .post(`${url}/getpostsforuser`, { token: getAccessToken() })
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

export const getSmallerPostsByUser = async () => {
  let posts: any[] = [];
  await axios
    .post(`${url}/getsmallerpostforuser`, { token: getAccessToken() })
=======
export const getOnlyUserPosts = async () => {
  let posts;
  await axios
    .post(`${url}/getonlyuserposts`, { token: getAccessToken() })
>>>>>>> 88f139f57531eee63bbf7d2b770a17cee60fcdd4
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

<<<<<<< HEAD
=======
export const getOnlyFriendsPosts = async () => {
  let posts;
  await axios
    .post(`${url}/getonlyfriendsposts`, { token: getAccessToken() })
    .then((res) => {
      posts = res.data.posts;
    });
  return posts;
};

>>>>>>> 88f139f57531eee63bbf7d2b770a17cee60fcdd4
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
  console.log("adding post");

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
