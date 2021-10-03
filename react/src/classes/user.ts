import { Location } from "./location";
import { Post } from "./post";

export class User {
  private _id: string;
  private _blockedUsers: User[] = [];
  private _firstname: string = "";
  private _lastname: string = "";
  private _age: number = -1;
  private _address: string = "";
  private _placeOfWork: string = "";
  posts: Post[] = [];

  constructor(id: string) {
    this._id = id;
  }

  // todo add age restrictions
  setUserInfo(
    firstname: string,
    lastname: string,
    age: number,
    address: string,
    placeOfWork: string
  ) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._age = age;
    this._address = address;
    this._placeOfWork = placeOfWork;
  }

  // todo is it better that user has all posts or just ids and ask server for them when i want to see
  addPost(
    location: Location,
    imageSrc: string,
    description?: string,
    tags?: string[]
  ): void {
    this.posts.push(new Post(this._id, location, imageSrc, description, tags));
  }

  deletePost(postId: string): void {
    for (let index = 0; index < this.posts.length; index++) {
      if (this.posts[index].id === postId) {
        this.posts.splice(index, 1);
        break;
      }
    }
  }

  updatePost(
    postId: string,
    location: Location,
    description?: string,
    tags?: string[]
  ): void {
    for (let index = 0; index < this.posts.length; index++) {
      if (this.posts[index].id === postId) {
        this.posts[index].editPost(location, description, tags);
        break;
      }
    }
  }

  //todo implement friends & block users
}
