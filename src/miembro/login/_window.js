import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../globals";
import { guardarSesion } from "../../_auth/utils";
import "./_style.css";

async function iniciarSesion(
  correo,
  contrasenia,
  setErrCorreo,
  setErrContrasenia,
  history
) {
  if (!correo) {
    setErrCorreo("Introduce tu CUM o el correo con el que registraste");
  }

  if (!contrasenia) {
    setErrContrasenia("Introduce tu contraseña.");
  }
  if (!correo || !contrasenia) {
    return;
  }

  const loginForm = {
    correo: correo,
    contrasenia: contrasenia,
  };

  const loginResponse = await axios
    .post(`${backendURL}/login/`, loginForm)
    .catch((err) => {
      const { msg, errCause } = err.response.data;
      if (errCause && errCause === "Correo") {
        setErrCorreo(msg);
      } else if (errCause && errCause === "Contraseña") {
        setErrContrasenia(msg);
      }
      return;
    });
  if (!loginResponse) return;

  guardarSesion(loginResponse.data.token);
  history.goBack();
}

export default function LogIn() {
  const history = useHistory();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">
          <img src="/images/mi-agenda-label.svg" alt="home"></img>
        </a>
      </nav>

      <main
        id="login"
        className="d-flex align-items-center justify-content-center"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            iniciarSesion(
              correo,
              contrasenia,
              setErrCorreo,
              setErrContrasenia,
              history
            );
          }}
          autoComplete="off"
          className="card"
        >
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
                  setErrCorreo("");
                }}
              />
              <small className="text-danger">{errCorreo}</small>
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
                  setErrContrasenia("");
                }}
              />
              <small className="text-danger">{errContrasenia}</small>
            </div>

            <div className="flex-grow-1"></div>

            <input
              type="submit"
              value="Iniciar sesión"
              className="btn btn-lg btn-primary mt-4 w-100"
            />
            <a href="/registro" className="btn registro-btn mt-1 w-100">
              Registrarme
            </a>
          </div>
        </form>
      </main>
    </div>
  );
}
