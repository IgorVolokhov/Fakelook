import MyMap from "../../components/MyMap";
import Options from "../../components/Options";
import { useState, useEffect } from "react";
import "./Menu.css";
import { User } from "../../classes/user";
import { Post } from "../../classes/post";
import { Location } from "../../classes/location";
import { getAllPostsForUser } from "../../services/posts/posts.axios";
import {
  emitPostAdded,
  socketStart,
} from "../../services/socket-io-client/socket";
import {
  axiosGetPersonalInfo,
  axiosUpdateUser,
} from "../../services/authentication/authentication.axios";
import { refreshAccessToken, refreshToken } from "../../services/tokens";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const [minimizedPosts, setMinimizedPosts] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(0);
  // on first join, load stuff (later describe)
  useEffect(() => {
    const setUsersFunction = async () => {
      const userInfoRes = await axiosGetPersonalInfo();
      if (!userInfoRes) {
        window.location.href = "/";
        return;
      }
      await setUserInfo(userInfoRes);
      console.log("Falling in here!!!!");
      console.log(userInfoRes);
      if (
        userInfoRes.Firstname === null ||
        userInfoRes.lastname === null ||
        userInfoRes.Age === null ||
        userInfoRes.Address === null ||
        userInfoRes.Place_Of_Work === null
      ) {
        window.location.href = "/userdetails";
      }
      console.log("user info: ");
      console.log(userInfoRes);

      await setUserInfo(userInfoRes);
      const posts = await getAllPostsForUser();
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
        <Options
          addPost={(post: any) => addPost1(post)}
          setRadius={(radius: number) => {
            setRadius(radius);
          }}
        ></Options>
      </div>

      <div className="grid-item">
        {/*convert posts from server to usable posts later  */}
        <MyMap radius={radius} postsFromFather={minimizedPosts}></MyMap>
      </div>
    </div>
  );
};

export default Menu;
