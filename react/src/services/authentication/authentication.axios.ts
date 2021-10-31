import axios from "axios";
import { deleteTokens, getAccessToken } from "../tokens";

// TODO move username password email into interface
// TODO get res id (200, 404 etc) and work with that

const url = `http://localhost:${process.env.PORT_USER || 3002}/users/`;

export const axiosSignup = async (
  username: string,
  password: string,
  email: string
) => {
  let isAddedRes: boolean = false;
  const signupUrl = url + "signup";
  await axios
    .post(signupUrl, { username: username, password: password, email: email })
    .then((res) => {
      const { message, isAdded } = res.data;
      isAddedRes = isAdded;
    });
  return isAddedRes;
};

export const axiosSignin = async (username: string, password: string) => {
  let isLoggedInRes: boolean = false;
  let messageRes: string = "",
    accessTokenRes: string = "",
    expiresInRes: number = -1,
    refreshTokenRes: string = "";
  const signinUrl = url + "login";
  await axios
    .post(signinUrl, { username: username, password: password })
    .then((res) => {
      const { message, isSignedIn, accessToken, refreshToken } = res.data;
      messageRes = message;
      isLoggedInRes = isSignedIn;
      accessTokenRes = accessToken.token;
      expiresInRes = accessToken.expiresIn;
      refreshTokenRes = refreshToken;
    });

  return {
    messageRes,
    isLoggedInRes,
    accessTokenRes,
    expiresInRes,
    refreshTokenRes,
  };
};
export const axiosSigninWithEmail = async (email: string) => {
  let isLoggedInRes: boolean = false;
  let messageRes: string = "",
    accessTokenRes: string = "",
    expiresInRes: number = -1,
    refreshTokenRes: string = "";
  const signinUrl = url + "emaillogin";
  await axios.post(signinUrl, { email: email }).then((res) => {
    const { message, isLoggedIn, accessToken, refreshToken } = res.data;
    messageRes = message;
    isLoggedInRes = isLoggedIn;
    accessTokenRes = accessToken.token;
    expiresInRes = accessToken.expiresIn;
    refreshTokenRes = refreshToken;
  });

  return {
    messageRes,
    isLoggedInRes,
    accessTokenRes,
    expiresInRes,
    refreshTokenRes,
  };
};

export const axiosGetUser = async () => {
  let user = null;
  const getUserUrl = url + "getuser";
  await axios.post(getUserUrl, { token: getAccessToken() }).then((res) => {
    user = res.data;
  });
  return user;
};

export const axiosGetPersonalInfo = async () => {
  let isLoggedIn = false;
  let data: any = {};
  const getUserUrl = url + "getpersonalinfo";
  await axios.post(getUserUrl, { token: getAccessToken() }).then((res) => {
    data = res.data.userInfo;
    if (data?.Id) {
      isLoggedIn = true;
    }
  });
  if (!isLoggedIn) {
    return false;
  }

  return data;
};

export const axiosUpdateUserobject = async (object: any) => {
  let isSuccsessRes = undefined;
  const updateUserUrl = url + "edit";
  await axios
    .patch(updateUserUrl, {
      token: getAccessToken(),
      firstname: object.firstname,
      lastname: object.lastname,
      age: object.age,
      address: object.address,
      place_Of_Work: object.place_Of_Work,
    })
    .then((res) => {
      const { isSuccsess } = res.data;
      isSuccsessRes = isSuccsess;
    });

  return isSuccsessRes;
};

export const axiosUpdateUser = async (
  firstname: string,
  lastname: string,
  age: number,
  address: string,
  place_Of_Work: string
) => {
  let isSuccsessRes = undefined;
  const updateUserUrl = url + "edit";
  await axios
    .patch(updateUserUrl, {
      token: getAccessToken(),
      firstname: firstname,
      lastname: lastname,
      age: age,
      address: address,
      place_Of_Work: place_Of_Work,
    })
    .then((res) => {
      const { isSuccsess } = res.data;
      isSuccsessRes = isSuccsess;
    });

  return isSuccsessRes;
};

export const logOut = async () => {
  deleteTokens();
};

export const axiosGetInfoForSearchDisplay = async (userIdes: number[]) => {
  let data: any = {};
  const getUserUrl = url + "getinfoforsearchdiplay";
  await axios.post(getUserUrl, { userIdes: userIdes }).then((res) => {
    data = res.data.information;
  });
  return data;
};
