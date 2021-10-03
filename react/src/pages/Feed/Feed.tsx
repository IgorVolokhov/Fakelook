import React, { useEffect, useState } from "react";
import { Post } from "../../classes/post";
import {
  getPostById,
  getPostsByUserId,
  getSmallerPostsByUser,
  addPost,
  editPost,
  getAllPosts,
} from "../../services/posts/posts.axios";

const Feed = () => {

  const [Posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const LoadFeed = async () => {
      const posts = await getAllPosts();
      if (posts) setPosts(posts);
      console.log(posts, "HELLO POSTS");
      
    };

    LoadFeed();
  }, []);
  return (
    <div>
      <h1>FAKELOOK</h1>
    </div>
  );
};

export default Feed;
