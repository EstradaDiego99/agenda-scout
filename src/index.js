import React, { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Home = lazy(() => import("./home/_window"));
const SignUp = lazy(() => import("./miembro/signup/_window"));
const LogIn = lazy(() => import("./miembro/login/_window"));

ReactDOM.render(
  <Router>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registro" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
        </Switch>
      </Suspense>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
