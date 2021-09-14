import MyMap from "../../components/MyMap";
import Options from "../../components/Options";
import { useState, useEffect } from "react";
import { getUsers } from "../../services/dummy-data";
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

const Menu = () => {
  const [user, setUser] = useState<User>();
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);

  // load users posts first time
  useEffect(() => {
    const setUsersFunction = async () => {
      const users = await getUsers();
      await setUser(users[0]);
      if (user) {
        setUsersPosts(user.posts);
      }
    };
    setUsersFunction();
  }, []);

  // when ever there are changes to user update posts
  useEffect(() => {
    const updatePosts = () => {
      if (user) {
        setUsersPosts(user.posts);
      }
    };
    updatePosts();
  }, [user]);

  const addPost1 = async () => {
    // if (!user) {
    //   return;
    // }
    // const user_tmp = user;
    // await setUser(undefined);
    // await user_tmp.addPost(
    //   new Location(32.08227, 34.81065),
    //   "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg"
    // );
    // await user_tmp.addPost(
    //   new Location(32.321458, 34.853196),
    //   "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg"
    // );
    // await setUser(user_tmp);
    // console.log(
    //   user_tmp.posts[1]._location.calculateDistanceFromHereInKm(
    //     32.321458,
    //     34.853196
    //   )
    // );

    // setUsersPosts(user.posts);

    console.log(
      await editComment(5, "EDITED this comment is cool cause it is edited!!")
    );
  };

  if (!user) {
    return <div>"loading....";</div>;
  }
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Options addPost={() => addPost1()}></Options>
      </div>
      <div className="grid-item">
        <MyMap postsFromFather={usersPosts}></MyMap>
      </div>
    </div>
  );
};

export default Menu;
