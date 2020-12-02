import React from "react";
import LoginComponent from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegisterComponent from "./components/register";
import LoginQR from "./components/loginqr";
import RegisterQR from "./components/registerQR";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>

        <Switch>
          <Route path='/login'>
            <LoginComponent />
          </Route>
          <Route path='/register'>
            <RegisterComponent />
          </Route>
          <Route path='/loginqr'>
            <LoginQR />
          </Route>
          <Route path='/registerqr'>
            <RegisterQR />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
