import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import schema from "../../validations/SignUp.validations";
import { axiosSignup } from "../../services/authentication/authentication.axios";

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
            console.log("go to login page");
          } else {
            console.log("something went wrong make fields red");
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
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
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
