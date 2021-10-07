import React, { useEffect, useState } from "react";
import { Post } from "../../classes/post";
import PostCard from "../../components/PostCard";
import CustomButton from "../../models/CustomButton";
import { useHistory } from "react-router-dom";
import {
  getPostById,
  getPostsByUserId,
  getSmallerPostsByUser,
  addPost,
  editPost,
  getAllPosts,
  removePost  
} from "../../services/posts/posts.axios";

// todo make feed only friends posts while my posts only my posts that you can edit
const MyPosts = () => {
  const history = useHistory();
  const [backendPosts, setBackendPosts] = useState<any>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();

  const postEdit = async (postId: any) => {
    const postFromServer = await getPostById(postId);
    const post = apiPost(postFromServer);

    setBackendPosts([post, ...backendPosts]);
  };

  function apiPost(apiPost: any) {
    return {
      //lat: number, lon: number, description?: string, tags?: string
      id: apiPost._id,
      lat: apiPost._location.lat,
      lon: apiPost._location.lon,
      description: apiPost.description,
      tags: apiPost._tags
    };
  }

  useEffect(() => {
    const LoadFeed = async () => {
      const posts = await getPostsByUserId();
      if (!posts) {
        window.location.href = "/";
      }

      setIsLoading(false);
      if (posts) {
        setPosts(posts);
        console.log(posts);
      }
      console.log(posts, "HELLO POSTS");
    };

    LoadFeed();
  }, []);

  if (!isLoading && posts.length === 0) {
    return <h1 className="message-text">No Posts Found</h1>;
  }

  return (
    <div className="posts-container scrollable">
      <div>
        <span>Posts:</span>
        <CustomButton
          text="Go Back"
          onClick={() => {
            history.goBack();
          }}
        ></CustomButton>
      </div>
      {isLoading ? (
        <h1 className="message-text">Loading...</h1>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div>
              <CustomButton
                text="Edit"
                onClick={() =>
                  postEdit(post.id)
                }
              />
              <CustomButton text="Delete" onClick={() => removePost(post)}/>
              <PostCard key={post.id} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
