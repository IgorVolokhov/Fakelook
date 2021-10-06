import React from "react";

const DisplayPost = ({ post, comments }: any) => {
  console.log(post);

  return (
    <div>
      <img src={post.Image_Src} />
    </div>
  );
};

export default DisplayPost;
