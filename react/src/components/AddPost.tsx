import axios from "axios";
import React, { useState, useEffect } from "react";
import { Location } from "../classes/location";
import { Post } from "../classes/post";
import { addPost } from "../services/posts/posts.axios";
import { getAccessToken } from "../services/tokens";
const baseURL = "http://localhost:3000";

const AddPost = ({ closeModal }: any) => {
  const [location, setLocation] = useState<Location>();
  let userLocation = new Location(32.08088, 34.78057);
  const [post, setPost] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<any>();

  function submit(e: any) {
    e.preventDefault();
    if (selectedFile != null && post.description != null && post.tags != null) {
      addPost(
        selectedFile,
        userLocation.lat,
        userLocation.lon,
        post.description,
        post.tags
      );
      alert("Post added successfully");
      closeModal();
    } else {
      alert("Please fill all information");
    }
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

  function convertToBase64(files: any) {
    if (!files) {
      return;
    }
    const file = files[0];
    console.log(file);

    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
      baseString = reader.result;
      setSelectedFile(baseString);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h3>
        <form>
          <div>
            <i className="far fa-images"></i>
            {' '}Upload Image:
            <input
              type="file"
              id="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => convertToBase64(e.target.files)}
            />
          </div>
          <br/>
          <div>
            <i className="fas fa-align-justify"></i>
            {' '}Description:
            <input
              type="text"
              onChange={handle}
              placeholder="Enter Description:"
              id="description"
            />{" "}
          </div>
          <br/>
          <div>
          <i className="fas fa-hashtag"></i>
            {' '}Tags:
            <input
              type="text"
              onChange={handle}
              placeholder="Enter Tags:"
              id="tags"
            />
          </div>
          <br/>
          <button onClick={submit}>Upload</button>
        </form>
      </h3>
    </div>
  );
};

export default AddPost;
