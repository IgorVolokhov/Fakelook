import React, { useEffect, useState } from "react";
import { Post } from "../../classes/post";
import PostCard from "../../components/PostCard";
import CustomButton from "../../models/CustomButton";
import { useHistory } from "react-router-dom";
import {
  getPostById,
  getOnlyUserPosts,
  removePost,
} from "../../services/posts/posts.axios";

// TODO make feed only friends posts while my posts only my posts that you can edit
const MyPosts = () => {
  const history = useHistory();
  const [backendPosts, setBackendPosts] = useState<any>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();

  const postEdit = async (postId: any) => {
    // const postFromServer = await getOnlyUserPosts();
    // const post = apiPost(postFromServer);
    // setBackendPosts([post, ...backendPosts]);
  };

  function apiPost(apiPost: any) {
    return {
      //lat: number, lon: number, description?: string, tags?: string
      id: apiPost._id,
      lat: apiPost._location.lat,
      lon: apiPost._location.lon,
      description: apiPost.description,
      tags: apiPost._tags,
    };
  }

  useEffect(() => {
    const LoadFeed = async () => {
      const posts = await getOnlyUserPosts();
      if (!posts) {
        // shoiuld i return him?
        //window.location.href = "/menu";
      }

      setIsLoading(false);
      if (posts) {
        await setPosts(posts);
      }
    };

    LoadFeed();
  }, []);

  const removePostFunction = async (post: any) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      await removePost(post);
    }
    const postsFromServer = await getOnlyUserPosts();
    if (postsFromServer) {
      await setPosts(postsFromServer);
    }
    setIsLoading(false);
  };

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
              <CustomButton text="Edit" onClick={() => postEdit(post.id)} />
              <CustomButton
                text="Delete"
                onClick={() => removePostFunction(post)}
              />
              <PostCard key={post.id} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
