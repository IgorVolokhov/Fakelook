import MyMap from "../../components/MyMap";
import Options from "../../components/Options";
import { useState, useEffect } from "react";
import "./Menu.css";
import { User } from "../../classes/user";
import { Post } from "../../classes/post";
import { Location } from "../../classes/location";
import {
  getPostById,
  getPostsByUserId,
  getSmallerPostsByUser,
  addPost,
  editPost,
} from "../../services/posts/posts.axios";
import {
  addComment,
  editComment,
  getCommentsForPost,
} from "../../services/comments/comments.axios";
import {
  emitPostAdded,
  socketStart,
} from "../../services/socket-io-client/socket";
import {
  axiosGetPersonalInfo,
  axiosUpdateUser,
} from "../../services/authentication/authentication.axios";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const [minimizedPosts, setMinimizedPosts] = useState<any[]>([]);

  // on first join, load stuff (later describe)
  useEffect(() => {
    const setUsersFunction = async () => {
      const userInfoRes = await axiosGetPersonalInfo();
      if (!userInfoRes) {
        window.location.href = "/";
        return;
      }

      console.log("user info: ");
      console.log(userInfoRes);

      await setUserInfo(userInfoRes);
      const posts = await getSmallerPostsByUser();
      await setMinimizedPosts(posts);
      console.log("mini posts: ", minimizedPosts);

      setIsLoading(false);
      socketStart();
    };

    setUsersFunction();
  }, []);

  const addPost1 = async (post: Post) => {
    console.log("adding post");

    emitPostAdded(post, "1");
  };

  if (isLoading) {
    return <div>"loading....";</div>;
  }
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Options addPost={(post: any) => addPost1(post)}></Options>
      </div>
      <div className="grid-item">
        {/*convert posts from server to usable posts later  */}
        <MyMap postsFromFather={minimizedPosts}></MyMap>
      </div>
    </div>
  );
};

export default Menu;
