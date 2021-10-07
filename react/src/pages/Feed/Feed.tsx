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
} from "../../services/posts/posts.axios";

// todo make feed only friends posts while my posts only my posts that you can edit

const Feed = ({ userInfoApp }: any) => {
  const history = useHistory();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const LoadFeed = async () => {
      const posts = await getPostsByUserId();
      if (!posts) {
        window.location.href = "/";
      }

      setIsLoading(false);
      if (posts) {
        setPosts(posts);
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
        <div className="posts-container ">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} userId={userInfoApp.Id}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
