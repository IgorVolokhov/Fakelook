import axios from "axios";

const url = `http://localhost:${process.env.PORT_ERROR}/errors/`;

export const getAllErrors = async () => {
  let errors;
  await axios.post(`${url}/getallerrors`).then((res) => {
    errors = res.data.errors;
  });
  return errors;
};

export const addError = async (errorText: string) => {
  let message;
  await axios
    .post(`${url}/adderror`, {
      errorText: errorText,
    })
    .then((res) => {
      message = res.data.message;
    });
  return message;
};

export const removeError = async (errorId: any) => {
  let message;
  await axios.post(`${url}/deleteerror`, { errorId }).then((res) => {
    message = res.data.message;
  });
  return message;
};
