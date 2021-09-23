import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [KeyEmail, setKeyEmail] = useState("");
  const [NewPass, setNewPass] = useState("");
  const requsetNewPassword = async () => {
    axios
      .post("http://localhost:3001/users/forgot", {Email})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const sendNewPassword = async () => {
      axios.post("http://localhost:3001/users/newpassowrd",{NewPass,KeyEmail})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <p>write you user Email address</p>
      <div>
      <TextField onChange={(event) => setEmail(event.target.value)} />
      </div>
       <br></br> <br></br>
      <Button variant="contained" color="primary" onClick={requsetNewPassword}>send to Email</Button>
      <br></br><br></br>
        <p>Enter key you got from your email</p>
        <TextField onChange={(event)=> setKeyEmail(event.target.value)}/>
        <p>Enter key you got from your new password</p>
        <TextField onChange={(event)=> setNewPass(event.target.value)}/>
        <br></br> <br></br> <br></br>
        <Button  variant="contained" color="primary" onClick={sendNewPassword}>send new password</Button>
    </div>
  );
};

export default ForgotPassword;
