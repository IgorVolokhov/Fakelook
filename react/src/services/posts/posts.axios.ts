import axios from "axios";

const url = "http://localhost:3001/users/";

// todo work on naming
// todo make interface for posts for map and not any

export const axiosGetPostsForMap = async (userId: string) => {
  // untill server is up
  const imgSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg";
  return [
    { loc: [32.08088, 34.78057], imgSrc: imgSrc },
    { loc: [31.66926, 34.57149], imgSrc: imgSrc },
    { loc: [32.276683, 34.911891], imgSrc: imgSrc },
    { loc: [32.321457, 34.853195], imgSrc: imgSrc },
  ];
  let postsForMapRes: any = null;
  const postsForMapUrl = url + "postsForMap";
  await axios.post(postsForMapUrl, { userId: userId }).then((res) => {
    const { postsForMap } = res.data;
    postsForMapRes = postsForMap;
  });
  return postsForMapRes;
};
