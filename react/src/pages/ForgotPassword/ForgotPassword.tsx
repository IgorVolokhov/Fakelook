import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [KeyEmail, setKeyEmail] = useState("");
  const [NewPass, setNewPass] = useState("");
  const requsetNewPassword = async () => {
    axios
      .post("http://localhost:3001/users/forgot", { Email })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  //(key, newPass, email)
  const sendNewPassword = async () => {
    axios
      .post("http://localhost:3001/users/change", { KeyEmail, NewPass, Email })
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Write your user Email address</p>
      <div>
        <TextField onChange={(event) => setEmail(event.target.value)} />
      </div>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={requsetNewPassword}>
        send to Email
      </Button>
      <br />
      <br />
      <p>Enter key you got from your email</p>
      <TextField onChange={(event) => setKeyEmail(event.target.value)} />
      <p>Enter key you got from your new password</p>
      <TextField
        type="password"
        onChange={(event) => setNewPass(event.target.value)}
      />
      <br /> <br /> <br />
      <Button variant="contained" color="primary" onClick={sendNewPassword}>
        send new password
      </Button>
    </div>
  );
};

export default ForgotPassword;
