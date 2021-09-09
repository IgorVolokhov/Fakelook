import React, { useState } from "react";
import axios from "axios";
const baseURL = "http://localhost:300";
export interface IUser {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  age: number;
  city: string;
  work: string;
}

const SignUp = () => {
  const [user, setUser] = useState<IUser | null>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    age: 0,
    city: "",
    work: "",
  });

  function SignUp(e) {
    e.preventDefault();
    axios.post(`${baseURL}/api/users/signup`, user).then((res) => {
      if (res.data !== "") {
        window.location.href = "/login";
      } else {
        alert("Wrong information!");
      }
    });
  }

  function handle(e) {
    //@ts-ignore
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <h4>
          Username:
          <input
            type="text"
            id="username"
            placeholder="Enter Username:"
            onChange={handle}
            value={user?.username}
          />
          <br />
          <br />
          Password:
          <input
            type="password"
            id="password"
            placeholder="Enter Password:"
            onChange={handle}
            value={user?.password}
          />
          <br />
          <br />
          Password again:
          <input
            type="password"
            id="repass"
            placeholder="Enter Password Again:"
            onChange={handle}
          />
          <br />
          <br />
          Email Address:
          <input
            type="text"
            id="email"
            placeholder="Enter Email Address:"
            onChange={handle}
            value={user?.email}
          />
          <br />
          <br />
          First Name:
          <input
            type="text"
            id="fName"
            placeholder="Enter First Name:"
            onChange={handle}
            value={user?.firstname}
          />
          <br />
          <br />
          Last Name:
          <input
            type="text"
            id="lName"
            placeholder="Enter Last Name:"
            onChange={handle}
            value={user?.lastname}
          />
          <br />
          <br />
          Birth Date:
          <input type="date" id="age" onChange={handle} value={user?.age} />
          <br />
          <br />
          City:
          <input
            type="text"
            id="address"
            placeholder="Enter City:"
            onChange={handle}
            value={user?.city}
          />
          <br />
          <br />
          Place Of Work:
          <input
            type="text"
            id="address"
            placeholder="Enter Place Of Work:"
            onChange={handle}
            value={user?.work}
          />
          <br />
          <br />
          <button onClick={SignUp}>Submit</button>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;
