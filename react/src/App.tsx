import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";
import Feed from "./pages/Feed/Feed";
import Header from "./components/Header";
import { refreshAccessToken, refreshToken } from "./services/tokens";
import NewUserDetails from "./pages/NewUser/NewUserDetails";
import { axiosGetPersonalInfo } from "./services/authentication/authentication.axios";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MyPosts from "./pages/MyPosts/MyPosts";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const asyncFuction = async () => {
      const userInfoRes = await axiosGetPersonalInfo();

      await setUserInfo(userInfoRes);
      console.log("app user info: ", userInfo);
      if (userInfo !== null && !userInfo) {
        refreshAccessToken(900);
      }
    };
    console.log("something changed");
    asyncFuction();
  }, []);

  return (
    <div className="App">
      <div onClick={() => refreshToken()}>
        <Header />
      </div>
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
              <Route path="/userdetails">
                <NewUserDetails />
              </Route>
              <Route path="/feed">
                <Feed userInfoApp={userInfo} />
              </Route>
              <Route path="/myposts">
                <MyPosts />
              </Route>
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
