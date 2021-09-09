import "./App.css";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Menu from "./pages/Menu/Menu";

function App() {
  return (
    <div className="App">
      <header className="header">
        Hello THIS IS HEADER WORK ON IT LATER :P
      </header>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/menu">
              <Menu />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
