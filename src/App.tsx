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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            padding: "0",
            fontSize: "20px",
          }}
        >
          <li style={{ margin: "20px" }}>
            <Link to='/login'>Login</Link>
          </li>
          <li style={{ margin: "20px" }}>
            <Link to='/register'>Register</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path='/'>
            <LoginComponent />
          </Route>
          <Route exact path='/login'>
            <LoginComponent />
          </Route>
          <Route exact path='/register'>
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
