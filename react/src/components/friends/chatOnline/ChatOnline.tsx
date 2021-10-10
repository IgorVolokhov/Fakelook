import "./chatOnline.css";
import { useEffect, useState } from "react";
import axios from "axios";
import icon from "../../../Images/user-icon.jpg";

const ChatOnline = ({ onlineUsersFather, currentId, setCurrentChat }: any) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      //   const res = await axios.get("/users/friends/" + currentId);
      //   setFriends(res.data);
      setFriends(onlineUsersFather);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    // setOnlineFriends(
    //   friends.filter((friend: any) => onlineUsers.includes(friend._id))
    // );
    setOnlineFriends(onlineUsersFather);
  }, [friends, onlineUsersFather]);

  const handleClick = async (user: any) => {
    // try {
    //   const res = await axios.get(
    //     `/conversations/find/${currentId}/${user._id}`
    //   );
    //   setCurrentChat(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="chat-online">
      {onlineFriends?.map((onlineFriend: any) => (
        <div
          className="chat-online-friend"
          onClick={() => handleClick(onlineFriend)}
        >
          <div className="chat-online-img-container">
            <img className="chat-online-img" src={icon} alt="" />
            <div className="chat-online-badge"></div>
          </div>
          <span className="chat-online-name">{onlineFriend?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
