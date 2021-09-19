import { FieldAttributes, Form, Formik, useField } from "formik";
import schema from "../../validations/Signin.validations";
import { Link } from "react-router-dom";
import { axiosSignin } from "../../services/authentication/authentication.axios";
import CustomButton from "../../models/CustomButton";
import { TextField } from "@material-ui/core";
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
  // will have input form for login with username, password, email login (button)
  // validations with formik

  // forgot password? (ahref)
  // with emial

  // not yet a member? Sign up!

  // login with google facebook
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
          let isLoggedIn = await axiosSignin(data.username, data.password);
          if (isLoggedIn) {
            console.log("you are in");
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

      <Link to="/signup">
        <CustomButton text="not a user?" />
      </Link>
    </div>
  );
};

export default Login;
