import { Comment } from "./comment";
import { LikeManager } from "./likeManager";
import { Location } from "./location";

export class Post {
  private _id: string;
  private _userId: string;
  _imageSrc: string;
  _location: Location;
  private _comments: Comment[];
  private _likes: LikeManager;
  private _description?: string = undefined;
  private _tags?: string[] = [];

  constructor(
    userId: string,
    location: Location,
    imageSrc: string,
    description?: string,
    tags?: string[]
  ) {
    // created automatically
    this._id = "unique id";
    this._comments = [];
    this._likes = new LikeManager();

    // required
    this._userId = userId;
    this._imageSrc = imageSrc;
    this._location = location;

    // optional
    this._description = description;
    this._tags = tags;
  }

  public get id(): string {
    return this._id;
  }

  editPost(location: Location, description?: string, tags?: string[]) {
    if (location) this.editLocation(location);
    if (description) this.editDescription(description);
    if (tags) this.editTags(tags);
  }

  private editLocation(location: Location) {
    this._location = location;
  }

  private editDescription(description: string) {
    this._description = description;
  }

  // todo check how to make it better
  private editTags(tags: string[]) {
    if (!this._tags) {
      this._tags = tags;
      return;
    }
    for (let index = 0; index < tags.length; index++) {
      this._tags.push(tags[index]);
    }
  }

  addComment(text: string): void {
    this._comments.push(new Comment(this._userId, this.id, text));
  }

  addLike(userId: string, isLiked: boolean) {
    this._likes.manageLikes(userId, isLiked);
  }

  deleteLike(userId: string) {
    this._likes.deleteLike(userId);
  }

  // todo tag users
}
