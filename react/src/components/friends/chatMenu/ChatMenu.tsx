import "./chatMenu.css";
import CustomButton from "../../../models/CustomButton";
import { useState, useEffect } from "react";
import { axiosGetInfoForSearchDisplay } from "../../../services/authentication/authentication.axios";
import Conversation from "../conversations/Conversation";
import { emitFriendRequest } from "../../../services/socket-io-client/socket";

const ChatMenu = ({ onlineUsers, setCurrentChat }: any) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("Select something");
  const [isSearchingUsers, setIsSearchingUsers] = useState(true);

  const setConversationsForUsers = async () => {
    // get conversations
    await fetchUsersForSearch();
  };

  const setConversationsForGroups = async () => {
    // TODO get from api all group conversations for this user and set them
    await setConversations([]);
    await setSearchText("Search for groups");
  };

  const fetchUsersForSearch = async () => {
    let userIdes = [];
    for (let index = 0; index < onlineUsers.length; index++) {
      userIdes.push(onlineUsers[index].User_Id);
    }

    const usersInformationForConversationsDisplay =
      await axiosGetInfoForSearchDisplay(userIdes);

    await setConversations(usersInformationForConversationsDisplay);
    await setSearchText("Search for friends");
  };

  return (
    <div className="chat-menu">
      <div className="chat-menu-wrapper">
        <div className="chat-option-button">
          <CustomButton
            text="Search for Users"
            onClick={() => setConversationsForUsers()}
          />
          <CustomButton
            text="My group Convertastions"
            onClick={() => setConversationsForGroups()}
          />
        </div>
        <input placeholder={searchText} className="chat-menu-input" />
        <div className="chat-conversations-wrapper">
          {conversations?.map((conversation) => (
            <div
              onClick={() =>
                isSearchingUsers
                  ? emitFriendRequest(conversation.User_Id)
                  : setCurrentChat(conversation)
              }
              key={conversation.Id}
            >
              <Conversation conversation={conversation} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
