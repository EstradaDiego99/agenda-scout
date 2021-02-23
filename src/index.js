import React, { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Home = lazy(() => import("./home/_window"));
const SignUp = lazy(() => import("./miembro/signup/_window"));
const LogIn = lazy(() => import("./miembro/login/_window"));
const Miembro = lazy(() => import("./miembro/_window"));

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

ReactDOM.render(
  <Router>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registro" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />

          <Route path="/:CUM" component={Miembro} />
        </Switch>
      </Suspense>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
