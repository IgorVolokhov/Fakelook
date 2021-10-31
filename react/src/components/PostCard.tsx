import { useState } from "react";
import CustomModal from "../models/CustomModal";
import DisplayPost from "./DisplayPost";

const PostCard = ({ post, userId }: any) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  if (!post) {
    return <div>Somehting went wrong</div>;
  }

  let tags = [];
  if (post.Tags) {
    tags = post.Tags.split(",");
  }

  return (
    <>
      <div
        className="post-container"
        onClick={() => {
          setIsShowModal(true);
        }}
      >
        <img src={post.Image_Src} style={{ width: "500px", height: "500px" }} />
        <div className="post-elements-padding">
          <div>
            <span>Likes: {5}</span>
          </div>
          <div>
            {tags.map((tag: string, index: number) => (
              <span key={index} className="post-tag-diplay">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isShowModal && (
        <CustomModal
          handleClose={() => setIsShowModal(false)}
          itemToDisplay={
            <DisplayPost post={post} userId={userId}></DisplayPost>
          }
        ></CustomModal>
      )}
    </>
  );
};

export default PostCard;
