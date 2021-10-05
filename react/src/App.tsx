import "./App.css";
import { useState, useMemo, useEffect } from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";
import Feed from "./pages/Feed/Feed";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { refreshAccessToken } from "./services/tokens";

function App() {
  useEffect(() => {
    refreshAccessToken(600);
  }, []);

  return (
    <div className="App">
      <header className="header">
        Hello THIS IS HEADER WORK ON IT LATER :P
      </header>
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
            <Route path="/forgot">
              <ForgotPassword />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
