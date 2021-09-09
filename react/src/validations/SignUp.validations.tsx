import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(4).max(15).required(),
  password: yup.string().min(4).max(15).required(),
  email: yup.string().email().required(),
});

export default schema;
