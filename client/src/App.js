import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home.component";
import RegistroMiembro from "./components/registro-miembro.component";
import InicioSesionComponent from "./components/inicio-sesion.component";
import "./App.css";

function App() {
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

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/registro" exact component={RegistroMiembro} />
      <Route path="/login" exact component={InicioSesionComponent} />
    </Router>
  );
}

export default App;
