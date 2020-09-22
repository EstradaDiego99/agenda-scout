import React, { useState } from "react";
import axios from "axios";
import { backendURL } from "../globals";
import "./inicio-sesion.component.css";

export default function InicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasenia, setErrorContrasenia] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!correo) {
      setErrorCorreo(`
        Introduce tu CUM o el correo con el que registraste.
      `);
    }

    if (!contrasenia) {
      setErrorContrasenia(`
        Introduce tu contraseña.
      `);
    }

    if (!correo || !contrasenia) {
      return;
    }

    const loginForm = {
      correo: correo,
      contrasenia: contrasenia,
    };

    try {
      const loginResponse = await axios.post(`${backendURL}/login/`, loginForm);
      document.cookie = `cum_token=${loginResponse.data.token}`;
      window.location = "/";
    } catch (error) {
      const { msg, errorCause } = error.response.data;
      if (errorCause && errorCause === "Correo") {
        setErrorCorreo(msg);
      } else if (errorCause && errorCause === "Contraseña") {
        setErrorContrasenia(msg);
      }
      return;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">
          <img src="/images/mi-agenda-label.svg" alt="home"></img>
        </a>
      </nav>

      <main id="inicio-sesion-component">
        <form onSubmit={iniciarSesion} autoComplete="off" className="card">
          <div className="card-body">
            <div className="form-group">
              <label>Correo electrónico o CUM: </label>
              <input
                autoComplete="nope"
                className="form-control"
                value={correo}
                placeholder="Correo electrónico o CUM"
                onChange={(e) => {
                  setCorreo(e.target.value);
                  setErrorCorreo("");
                }}
              />
              <small className="text-danger">{errorCorreo}</small>
            </div>

            <div className="form-group">
              <label>Contraseña: </label>
              <input
                type="password"
                autoComplete="nope"
                className="form-control"
                value={contrasenia}
                onChange={(e) => {
                  setContrasenia(e.target.value);
                  setErrorContrasenia("");
                }}
              />
              <small className="text-danger">{errorContrasenia}</small>
            </div>

            <div className="flex-grow-1"></div>

            <input
              type="submit"
              value="Iniciar sesión"
              className="btn btn-primary mt-4"
            />
            <a href="/registro" className="btn registro-btn">
              Registrarme
            </a>
          </div>
        </form>
      </main>
    </div>
  );
}
