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
import Friends from "./components/friends/Friends";
import Errors from "./pages/Errors/Errors";

function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const asyncSetUser = async () => {
      const userInfoRes = await axiosGetPersonalInfo();

      await setUserInfo(userInfoRes);
    };
    asyncSetUser();
  }, []);

  useEffect(() => {
    const asyncCheckLoggedIn = async () => {
      if (!userInfo) {
        setIsLoadingUser(true);
        return;
      }
      await setIsLoadingUser(false);
      refreshAccessToken(900);
    };
    asyncCheckLoggedIn();
  }, [userInfo]);

  const ProtectedRoutes = () => {
    if (userInfo === false) {
      window.location.href = "/";
    }

    return (
      <Switch>
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
        <Route exact path="/friends">
          <Friends userInfoApp={userInfo} />
        </Route>{" "}
        <Route path="/errors">
          <Errors />
        </Route>
      </Switch>
    );
  };

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
              {userInfo !== false && isLoadingUser ? (
                <div>Loading ... </div>
              ) : (
                <ProtectedRoutes />
              )}
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
