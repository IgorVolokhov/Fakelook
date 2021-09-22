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
import { emitPostAdded, socketStart } from "../../services/socket-io-client/socket";

const Menu = () => {
  const [user, setUser] = useState<User>();
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);

  // on first join, load stuff (later describe)
  useEffect(() => {
    const setUsersFunction = async () => {
      socketStart();
      await setUser(new User("dummyUser", "dummyUser"));
      const posts = await getPostsByUserId("l_ktkccpl4_q349me4vker8g340vq39v");
      // await setUser(users[0]);
      if (posts) {
        setUsersPosts(posts);
      }
    };
    setUsersFunction();
  }, []);

  const addPost1 = async (post: Post) => {
    console.log("adding post");
    
    emitPostAdded(post, "1");
  };

  if (!user) {
    return <div>"loading....";</div>;
  }
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Options addPost={(post: any) => addPost1(post)}></Options>
      </div>
      <div className="grid-item">
        {/*convert posts from server to usable posts later  */}
        <MyMap postsFromFather={[]}></MyMap>
      </div>
    </div>
  );
};

export default Menu;
