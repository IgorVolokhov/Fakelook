import "./App.css";
import { useState, useMemo } from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";
import Feed from "./pages/Feed/Feed";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NewUserDetails from "./pages/NewUser/NewUserDetails";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
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
            <Route path="/userdetials">
              <NewUserDetails/>
              </Route>
            <Route path="/feed">
              <Feed/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
