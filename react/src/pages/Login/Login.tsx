import { useContext } from "react";
import { FieldAttributes, Form, Formik, useField } from "formik";
import schema from "../../validations/Signin.validations";
import { Link } from "react-router-dom";
import { axiosSignin } from "../../services/authentication/authentication.axios";
import CustomButton from "../../models/CustomButton";
import { TextField } from "@material-ui/core";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../../services/tokens";

const baseURL = "http://localhost:9000";
export interface IUser {
  username: string;
  password: string;
}

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <>
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText}
        type={type}
      />
      <br />
    </>
  );
};

const Login = () => {
  const googleAuth = (res: any) => {
    const id_token = res.getAuthResponse().id_token;
    axios
      .post("http://localhost:3001/users/googlelogin", {
        googleId: res.googleId,
        email: res.Rs.Ct,
        first_name: res.Rs.mU,
        last_name: res.Rs.mS,
        id_token: id_token,
      })
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.log(err));
  };
  const facebookAuth = (res: any) => {
    axios
      //create in the backend route that get the info and save in the user db
      //in the backend the route check if in db user is there if not create one
      //else login and respone to front to go in to menu
      .post("http://localhost:3001/users/facebook/login", {
        name: res.googleId,
        email: res.email,
        picture: res.picture,
        id: res.id,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  const responseFacebook = (res: any) => {
    console.log(res);
  };
  // will have input form for login with username, password, email login (button)
  // validations with formik

  // forgot password? (ahref)
  // with emial

  // not yet a member? Sign up!

  // login with google facebook

  const goToMenu = () => {
    window.location.href = "/menu";
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <Formik
        validateOnChange={true}
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const {
            messageRes,
            isLoggedInRes,
            accessTokenRes,
            expiresInRes,
            refreshTokenRes,
          } = await axiosSignin(data.username, data.password);
          if (isLoggedInRes) {
            saveAccessToken(accessTokenRes, expiresInRes);
            saveRefreshToken(refreshTokenRes);
            goToMenu();
          } else {
            console.log("OUT!!");
          }
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField placeholder="Username" name="username" />
            <MyTextField
              placeholder="Password"
              type="password"
              name="password"
            />
            <div>
              <CustomButton
                type="submit"
                isDisabled={isSubmitting}
                text="Log in"
              />
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/forgot">
          <CustomButton text="forgot password ?" />
        </Link>
      </div>

      <div>
        <FacebookLogin
          // change it to .env
          appId=""
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        ></FacebookLogin>
      </div>
      <div>
        <GoogleLogin
          // change it to .env
          clientId="930253588119-dsir0h8j06nq0t2dc3avmm0i11n0adq6.apps.googleusercontent.com"
          onSuccess={googleAuth}
          onFailure={googleAuth}
          cookiePolicy={"single_host_origin"}
        >
          <span>Login with Google</span>
        </GoogleLogin>
      </div>

      <Link to="/signup">
        <CustomButton text="not a user?" />
      </Link>
    </div>
  );
};

export default Login;
