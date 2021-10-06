import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";
import Feed from "./pages/Feed/Feed";
import Header from "./components/Header";
import { refreshAccessToken } from "./services/tokens";
import NewUserDetails from "./pages/NewUser/NewUserDetails";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  useEffect(() => {
    refreshAccessToken(600);
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
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/userdetails">
              <NewUserDetails />
            </Route>
            <Route path="/forgot">
              <ForgotPassword />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
