import axios from "axios";
import React, { useState, useEffect } from "react";
import { Location } from "../classes/location";
import { Post } from "../classes/post";
const baseURL = "http://localhost:3000";

const AddPost = (id: any) => {
  const [location, setLocation] = useState<Location>();
  let userLocation = new Location(32.08088, 34.78057);
  const [post, setPost] = useState<Post | null>();
  const [selectedFile, setSelectedFile] = useState();

  function submit(e: any) {
    e.preventDefault();
    console.log(post);
    
    // console.log(post);
    // axios.post(`${baseURL}/Routes/PostRoutes/addpost`, post).then((res) => {
    //   console.log(res.data);
    // });
  }

  function handle(e: any) {
    //@ts-ignore
    setPost({ ...post, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude: ", position.coords.latitude);
        console.log("Longitude: ", position.coords.longitude);
        userLocation = new Location(
          position.coords.latitude,
          position.coords.longitude
        );
        setLocation(userLocation);
      });
    } else {
      console.log("Not Avaliable");
    }
  }, []);

  return (
    <div>
      <h3>
        <form>
          Upload Image:
          <input type="file" id="file" onChange={handle}/>
          <br />
          <br />
          Description:
          <input type="text" onChange={handle} placeholder="Enter Description:" id="description"/>
          <br />
          <br />
          <button onClick={submit}>Upload</button>
        </form>
      </h3>
    </div>
  );
};

export default AddPost;
