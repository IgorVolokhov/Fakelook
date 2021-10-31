import Comments from "./comments/Comments";

const DisplayPost = ({ post, userId, comments }: any) => {
  return (
    <div className="scrollable">
      <img src={post.Image_Src} style={{ height: "500px", width: "500px" }} />
      <Comments postId={post.Post_Id} currentUserId={userId}></Comments>
    </div>
  );
};

export default DisplayPost;
