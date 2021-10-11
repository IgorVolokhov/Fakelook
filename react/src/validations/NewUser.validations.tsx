import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup.string().min(2).max(15).required(),
  lastname: yup.string().min(2).max(15).required(),
  age: yup.number().required(),
  address: yup.string().min(2).max(20).required(),
  place_Of_Work: yup.string().min(2).max(20).required(),
});
export default schema;
