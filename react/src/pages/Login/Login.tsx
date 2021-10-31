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

export interface IUser {
  username: string;
  password: string;
}

// TODO can my text field be moved from him and used in similar places
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
  const responseGoogle = async (response: any) => {
    const email = response?.profileObj?.email;
    if (email) {
      signinWithEmail(email);
    }
  };

  const responseFacebook = (res: any) => {
    const email = res.email;
    if (email) {
      signinWithEmail(email);
    }
  };

  const signinWithEmail = async (email: string) => {
    const { isLoggedInRes, accessTokenRes, expiresInRes, refreshTokenRes } =
      await axiosSigninWithEmail(email);

    if (isLoggedInRes) {
      saveRefreshToken(refreshTokenRes);
      saveAccessToken(accessTokenRes, expiresInRes);
      goToMenu();
    } else {
      // TODO display to user he is out
      // do nothing for now but you are out
    }
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
            {/* can be used to show form values and errors cool thing for development */}
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
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
          fields="name,email,picture"
          callback={responseFacebook}
          scope="public_profile, email"
        ></FacebookLogin>
      </div>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        >
          <span>Login with Google</span>
        </GoogleLogin>
      </div>

      <Link to="/signup">
        <CustomButton text="not a user? signup!" />
      </Link>
    </div>
  );
};

export default Login;
