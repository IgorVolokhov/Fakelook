import { FieldAttributes, Form, Formik, useField } from "formik";
import schema from "../../validations/Signin.validations";
import { Link } from "react-router-dom";
import {
  axiosSignin,
  axiosSigninWithEmail,
} from "../../services/authentication/authentication.axios";
import CustomButton from "../../models/CustomButton";
import { TextField } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { saveAccessToken, saveRefreshToken } from "../../services/tokens";

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

  // TODO move text field out side of here, maybe other componnets want to use it as well
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
<<<<<<< HEAD
 
  // todo come back here and implement tokens, note if it is first time make account with that email
  const responseGoogle = (response: any) => {
=======
  const responseGoogle = async (response: any) => {
>>>>>>> 34939793510dad57c07306968395f9bfe9d9ce29
    const email = response?.profileObj?.email;
    if (email) {
      signinWithEmail(email);
    }
  };

  const responseFacebook = (res: any) => {
<<<<<<< HEAD
    console.log(res);
    console.log(res.email);
=======
    const email = res.email;
    if (email) {
      signinWithEmail(email);
    }
  };

  const signinWithEmail = async (email: string) => {
    const {
      messageRes,
      isLoggedInRes,
      accessTokenRes,
      expiresInRes,
      refreshTokenRes,
    } = await axiosSigninWithEmail(email);
    if (isLoggedInRes) {
      saveRefreshToken(refreshTokenRes);
      saveAccessToken(accessTokenRes, expiresInRes);
      goToMenu();
    } else {
      console.log("OUT!!");
    }
>>>>>>> 34939793510dad57c07306968395f9bfe9d9ce29
  };

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
            saveRefreshToken(refreshTokenRes);
            saveAccessToken(accessTokenRes, expiresInRes);
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
            <MyTextField
              placeholder="Username"
              name="username"
              data-testid="field"
            />
            <MyTextField
              placeholder="Password"
              type="password"
              name="password"
              data-testid="field"
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
          appId="4637753582931156"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        ></FacebookLogin>
      </div>
      <div>
        <GoogleLogin
          // change it to .env
          clientId="930253588119-dsir0h8j06nq0t2dc3avmm0i11n0adq6.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
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
