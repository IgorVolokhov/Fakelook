import { Formik, Form, useField, FieldAttributes } from "formik";
import { TextField, Button } from "@material-ui/core";
import schema from "../../validations/SignUp.validations";
import { axiosSignup } from "../../services/authentication/authentication.axios";
import CustomButton from "../../models/CustomButton";

// TODO on taken info on signup do something better than alert

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

const SignUp = () => {
  return (
    <div>
      <h1>SIGNUP</h1>
      <Formik
        validateOnChange={true}
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={schema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let isAdded = await axiosSignup(
            data.username,
            data.password,
            data.email
          );
          if (isAdded) {
            window.location.href = "/";
          } else {
            alert("taken info");
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
            <MyTextField placeholder="Email" name="email" />
            <div>
              {/* <Button disabled={isSubmitting} type="submit">
                submit
              </Button> */}
              <CustomButton
                type="submit"
                isDisabled={isSubmitting}
                text="Signup"
              />
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
