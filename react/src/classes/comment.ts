import { LikeManager } from "./likeManager";

export class Comment {
  id: string;
  userId: string;
  postId: string;
  text: string;
  likes: LikeManager;

  constructor(userId: string, postId: string, text: string) {
    this.id = "generate unique id";
    this.userId = userId;
    this.postId = postId;
    this.text = text;
    this.likes = new LikeManager();
  }
}
