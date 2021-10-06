import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";
import Feed from "./pages/Feed/Feed";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { refreshAccessToken, refreshToken } from "./services/tokens";
import Header from "./components/Header";
import NewUserDetails from "./pages/NewUser/NewUserDetails";
import { axiosGetPersonalInfo } from "./services/authentication/authentication.axios";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const asyncFuction = async () => {
      const userInfoRes = await axiosGetPersonalInfo();

      await setUserInfo(userInfoRes);
      console.log("app user info: ", userInfo);
    };
    console.log("something changed");
    asyncFuction();
  }, []);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/forgot">
              <ForgotPassword />
            </Route>
            <div onClick={() => refreshToken()}>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/userdetials">
                <NewUserDetails />
              </Route>
              <Route path="/feed">
                <Feed userInfoApp={userInfo} />
              </Route>
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
