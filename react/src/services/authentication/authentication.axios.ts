import axios from "axios";

// TODO move username password email into interface

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
      console.log(message);
      isAddedRes = isAdded;
    });
  return isAddedRes;
};

export const axiosSignin = async (username: string, password: string) => {
  let isLoggedInRes: boolean = false;
  const signinUrl = url + "login";
  await axios
    .post(signinUrl, { username: username, password: password })
    .then((res) => {
      const { message, isLoggedIn } = res.data;
      isLoggedInRes = isLoggedIn;
    });
  return isLoggedInRes;
};
