import axios from "axios";

const url = "http://localhost:3001/users";

// todo work on naming
// todo make interface for posts for map and not any
//get Post By Id(postId)
////get Smaller Posts For Map(userId)
////get Whole Posts For User(userId)
//add Comment To Post(postId, comment)
//add Post(userId, post)
//edit Post(post)


// user will see another profile could see all the posts 
export const seeAllUserProfile = async (userId:any) =>{
  const send = await  axios.post(`${url}/getfullprofile`,userId)
}
//fully detail picture with likes and comments
export const fullPost = async (userId:any) =>{
  const send = await axios.post(`${url}/getdetailpost`,userId);
}
//add post to db
export const addPost = async (Post:any,userId:any) =>{
  const send = await axios.post(`${url}/addpost`,{Post,userId});
}
//edit post 
export const editPost = async (Post:any) =>{
  const send =await axios.post(`${url}/editpost`,Post);
}
//user add to post comment
export const addCommentToPost = async (postId : any,userId: any,comment: any) =>{
 const send =await axios.post(`${url}/commentonpost`,{postId,userId,comment})
}
//get only the post without details
export const axiosGetSmallPosts = async (userId:any) =>{
  const send =  await  axios.post(`${url}/getpostbyuser`,userId)
}
//get from mini map the post id to get the 
export const axiosGetPostById = async (postid: any) => {
  const send= await axios.post(`${url}/getpost`,postid)
}

export const axiosGetPostsForMap = async (userId: string) => {
  // untill server is up
  const imgSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg";
  return [
    { location: [32.08088, 34.78057], imgSrc: imgSrc },
    { location: [31.66926, 34.57149], imgSrc: imgSrc },
    { location: [32.276683, 34.911891], imgSrc: imgSrc },
    { location: [32.321457, 34.853195], imgSrc: imgSrc },
  ];
  let postsForMapRes: any = null;
  const postsForMapUrl = url + "postsForMap";
  await axios.post(postsForMapUrl, { userId: userId }).then((res) => {
    const { postsForMap } = res.data;
    postsForMapRes = postsForMap;
  });
  return postsForMapRes;
};
