import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export const socketStart = () => {
    socket.emit("message", {message: "this is hello from react!!"})

    socket.on("message", (message) => {
        console.log("i have some message");
        console.log(message);
    })
}

export const emitPostAdded = (post: any, user: any) => {
    socket.emit("emitPostAdded", {post: post, user: user})
}
    