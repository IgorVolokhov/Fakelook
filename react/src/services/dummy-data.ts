import { Location } from "../classes/location";
import { User } from "../classes/user";

const users_dummy_data: User[] = [
  new User("volokhov9@gmail.com", "igor-Username"),
  new User("liel@gmail.com", "liel-username"),
  new User("eyal@gmail.com", "eyal-username"),
];
users_dummy_data[0].setUserInfo("Igor", "Volokhov", 22, "Netaniya", "none :(");
users_dummy_data[0].setUserInfo("Liel", "arie", 22, "kadima", "sela");
users_dummy_data[0].setUserInfo("eyal", "rainitz", 22, "tel-aviv", "sela!!");

const imagesUrl = [
  "https://www.rivercollective.org/wp-content/uploads/2020/10/RiverIntellectuals@Oetztal-20092020_pKatjaPokorn-23.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg",
  "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg",
  "https://wallup.net/wp-content/uploads/2019/09/206448-green-nature-trees-waterfalls.jpg",
  "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
  "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
];

users_dummy_data[0].addPost(
  new Location(31.771959, 35.217018),
  imagesUrl[0],
  "some nice pic"
);
// users_dummy_data[0].addPost(
//   new Location(32.771959, 33.217018),
//   imagesUrl[1],
//   "close to nature i guess"
// );
// users_dummy_data[0].addPost(
//   new Location(30.771959, 34.217018),
//   imagesUrl[2],
//   "some really long string cause i need to check how it will look but not really it just something i do not know"
// );
// users_dummy_data[0].addPost(
//   new Location(31.546959, 33.234018),
//   imagesUrl[3],
//   "something small"
// );
// users_dummy_data[0].addPost(
//   new Location(33.771959, 33.237018),
//   imagesUrl[4],
//   "fasdfcpvjdfasodpif f asdofdfhasdkjlfkjltkdsfjab ; dafdshf s;df adhf;sadfh;sdfhasd;fadsf;nds sa ;das;fasdf;asd ;sh ;f dfasdfh;asdjfhusaypter[iqwuklxcnv  j'jsdafsdklfna 'h' kefhsd'f [ihfsdknsad d dsasd';lkjfdsafkjwieohsaklv "
// );
// users_dummy_data[0].addPost(
//   new Location(33.771959, 33.237018),
//   imagesUrl[5],
//   "something something"
// );

for (let i = 0; i < users_dummy_data.length; i++) {
  for (let j = 0; j < users_dummy_data[i].posts.length; j++) {
    users_dummy_data[i].posts[j].addComment(`${i}: some comment`);
    users_dummy_data[i].posts[j].addComment(`${j}: some comment`);
  }
}

export const comments = [
  {
    Comment_Id: 1,
    User_Id: 1,
    Post_Id: 1,
    Likes: 0,
    DisLikes: 0,
    Text: "Wow first ever post and comment!!",
  },
  {
    Comment_Id: 2,
    User_Id: 1,
    Post_Id: 1,
    Likes: 0,
    DisLikes: 0,
    Text: "this comment was edited from app.js!! cool, right?",
  },
];

export const whole_posts_by_user = [
  {
    Post_Id: 1,
    User_Id: 1,
    Image_Src: "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg",
    Lat: 31.771959,
    Lon: 35.217018,
    Likes: 0,
    Dislikes: 0,
    Description: "this description is from app.js it is cool!!",
    Tags: null,
  },
  {
    Post_Id: 4,
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 33.771959,
    Lon: 33.237018,
    Likes: 0,
    Dislikes: 0,
    Description: null,
    Tags: null,
  },
  {
    Post_Id: 5,
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 33.237018,
    Likes: 0,
    Dislikes: 0,
    Description: "null",
    Tags: "null",
  },
  {
    Post_Id: 6,
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 33.237018,
    Likes: 0,
    Dislikes: 0,
    Description: null,
    Tags: null,
  },
  {
    Post_Id: 7,
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 34.237018,
    Likes: 0,
    Dislikes: 0,
    Description: "hello it is a test",
    Tags: null,
  },
];

export const smaller_posts_by_user = [
  {
    User_Id: 1,
    Image_Src: "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg",
    Lat: 31.771959,
    Lon: 35.217018,
  },
  {
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 33.771959,
    Lon: 33.237018,
  },
  {
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 33.237018,
  },
  {
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 33.237018,
  },
  {
    User_Id: 1,
    Image_Src:
      "https://brokenpanda.net/wp-content/uploads/1588190723_163_4K-Nature-Wallpapers-2020.jpg",
    Lat: 31.546959,
    Lon: 34.237018,
  },
];

export const get_post_by_post_id = {
  Post_Id: 1,
  User_Id: 1,
  Image_Src: "https://miro.medium.com/max/1200/1*U18aWqq2322t8Z26zZ0SIg.jpeg",
  Lat: 31.771959,
  Lon: 35.217018,
  Likes: 0,
  Dislikes: 0,
  Description: "this description is from app.js it is cool!!",
  Tags: null,
};

export const getUsers = () => {
  return users_dummy_data;
};
