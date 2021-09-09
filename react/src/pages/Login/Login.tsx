import { Link } from "react-router-dom";
const baseURL = "http://localhost:9000"; 
export interface IUser {
  username: string,
  password: string
}

const Login = () => {
  // will have input form for login with username, password, email login (button)
  // validations with formik

  // forgot password? (ahref)
  // with emial

  // not yet a member? Sign up!

  // login with google facebook
  return (
    <div>
      <h1 className="header">Welcome To FakeLook!</h1>
      <h3>Username:</h3>
      <input type="text" placeholder="Enter Username:"/>
      <h3>Password:</h3>
      <input type="password" placeholder="Enter Password:"/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Link to="/signup">
          <button>Not A User?</button>
      </Link>
    </div>
  );
};

export default Login;
