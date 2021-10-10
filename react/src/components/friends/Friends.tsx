import "./friends.css";
import { useState, useEffect, useRef } from "react";
import CustomButton from "../../models/CustomButton";
import ChatOnline from "./chatOnline/ChatOnline";
import Conversation from "./conversations/Conversation";
import Message from "./message/Message";
import { uniqueId } from "../../helpers/uniqueId";
import {
  emitAddUser,
  emitSendMessage,
  socketStartFriends,
} from "../../services/socket-io-client/socket";
import { axiosGetInfoForSearchDisplay } from "../../services/authentication/authentication.axios";
import ChatMenu from "./chatMenu/ChatMenu";
import { useHistory } from "react-router-dom";

const Friends = ({ userInfoApp }: any) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<string>(""); // make logic

  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<any[]>([]);
  const scrollRef = useRef<any>();

  const dummyonlineuser = [
    { socketId: "Gc1C4La7tWAsfpgyAAAN", userId: 4, username: "John Doe" },
    { socketId: "Gc1C4La7tWAsfpgyAAAN", userId: 5, username: "hello there" },
  ];

  useEffect(() => {
    const setUsersFunction = async () => {
      console.log("from father: ", userInfoApp);

      await setUserInfo(userInfoApp);
      if (userInfo === false) {
        console.log("from friends, this is user info: ", userInfo);
        window.location.href = "/";
      }

      await setOnlineFriends(dummyonlineuser);
    };

    setUsersFunction();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = [
          {
            senderId: 4,
            text: "this is first message i am so cool!!",
            messageId: 1,
            roomId: 1,
            createdAt: "23:35",
          },
          {
            senderId: 5,
            text: "hello there this is second message",
            messageId: 2,
            roomId: 1,
            createdAt: "23:36",
          },
        ]; // get message for current conversation from db current chat .id
        await setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const connectToSocket = async () => {
      if (userInfo === null) {
        return;
      }
      socketStartFriends(userInfo.Id, setOnlineUsers);
    };

    connectToSocket();
  }, [userInfo]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (checkIfStringNotOnlySpaces(newMessage)) {
      setNewMessage("");
      return;
    }
    const message: any = {
      senderId: userInfo.Id,
      text: newMessage,
      conversationId: currentChat.Id,
    };

    const reciverId = currentChat.members.find(
      (member: any) => member !== userInfo.Id
    );

    emitSendMessage(userInfo.Id, reciverId, newMessage);

    try {
      // send message to api to update sql
      // const res = await axios post message, then add res.data into set messages and not message
      message.Id = uniqueId();
      message.createdAt = "0:06";
      console.log(message);

      setMessages([...messages, message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // TODO move it to helpers might be used by others
  function checkIfStringNotOnlySpaces(someString: string): boolean {
    return !someString.replace(/\s/g, "").length;
  }

  if (userInfo === null) {
    return <div>Loading ..</div>;
  }

  return (
    <>
      <CustomButton
        text="Go Back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="messenger">
        <ChatMenu onlineUsers={onlineUsers} setCurrentChat={setCurrentChat} />
        <div className="chat-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {messages.length > 0 &&
                    messages.map((message) => (
                      <div ref={scrollRef}>
                        <Message
                          message={message}
                          own={userInfo?.Id === message?.senderId}
                        />
                      </div>
                    ))}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    className="chat-message-input"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <CustomButton
                    className="chat-submit-button"
                    text="send"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            ) : (
              <span className="no-conversation-text">Open a conversation!</span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chat-online-wrapper">
            <ChatOnline
              onlineUsersFather={onlineFriends}
              currentId={userInfo.Id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
