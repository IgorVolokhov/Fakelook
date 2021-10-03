import axios from "axios";
import { deleteTokens, getAccessToken } from "../tokens";

// TODO move username password email into interface
// todo get res id (200, 404 etc) and work with that

const url = "http://localhost:3001/users/";

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
  let info = null;
  const getUserUrl = url + "getpersonalinfo";
  await axios.post(getUserUrl, { token: getAccessToken() }).then((res) => {
    info = res.data.userInfo;
    if (info && info.Id) {
      isLoggedIn = true;
    }
  });
  if (!isLoggedIn) {
    return false;
  }
  return info;
};

export const logOut = async () => {
  deleteTokens();
};
