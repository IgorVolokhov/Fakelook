export class LikeManager {
  private _likes: Like[];

  constructor() {
    this._likes = [];
  }

  public Likes(): Like[] {
    return this._likes;
  }

  manageLikes(userId: string, isLiked: boolean): void {
    let isExisted = false;
    // check if already exists
    for (let index = 0; index < this._likes.length; index++) {
      if (this._likes[index].userId() === userId) {
        this._likes[index].changeIsLiked(isLiked);
        isExisted = true;
        break;
      }
    }
    if (isExisted) {
      return;
    }
    // add new like
    this._likes.push(new Like(userId, isLiked));
  }

  // todo check if delete works
  deleteLike(userId: string): void {
    for (let index = 0; index < this._likes.length; index++) {
      if (this._likes[index].userId() === userId) {
        this._likes.splice(index, 1);
        break;
      }
    }
  }
}

class Like {
  private _userId: string;
  private _isLiked: boolean;

  constructor(userId: string, isLiked: boolean) {
    this._userId = userId;
    this._isLiked = isLiked;
  }

  public userId(): string {
    return this._userId;
  }

  changeIsLiked(isLiked: boolean): void {
    this._isLiked = isLiked;
  }
}
