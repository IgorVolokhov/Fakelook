import { useEffect } from "react";
import io from "socket.io-client";
import { axiosGetInfoForSearchDisplay } from "../authentication/authentication.axios";

const socket = io(`http://localhost:${process.env.PORT_SOCKET || 3005}/`);

export const socketStart = () => {};

export const socketStartFriends = async (
  userId: number,
  setOnlineUsers: any
) => {
  emitAddUser(userId);

  // set online users
  socket.on("getUsers", async (users) => {
    await setOnlineUsers(users);
  });

  // get message send it to reciver and add to list
  socket.on("getMessage", (data) => {});

  socket.on("getFriendRequest", async (senderId) => {
    console.log("wants to be your friend: ", senderId);
    const senderInfo = await axiosGetInfoForSearchDisplay([senderId]);
    console.log("sender info: ", senderInfo);

    const fullName = `${senderInfo[0].Firstname}, ${senderInfo[0].Lastname}`;
    let isAccepted = window.confirm(`${fullName} wants to be your friend!`);
    if (isAccepted) {
      socket.emit("emitAcceptedFriendRequest", {
        userId: senderInfo[0].User_Id,
      });
    }
  });
};

export const emitAddUser = (userId: any) => {
  socket.emit("emitAddUser", userId);
};

export const emitSendMessage = (
  senderId: any,
  reciverId: any,
  text: string
) => {
  socket.emit("emitSendMessage", {
    senderId: senderId,
    reciverId: reciverId,
    text: text,
  });
};

export const emitPostAdded = (post: any, user: any) => {
  //socket.emit("emitPostAdded", { post: post, user: user });
};

export const emitFriendRequest = (reciverId: number) => {
  socket.emit("emitFrindRequest", {
    userId: reciverId,
  });
};
