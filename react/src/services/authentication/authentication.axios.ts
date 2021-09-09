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

const axiosSignin = async (username: string) => {
  return true;
};
