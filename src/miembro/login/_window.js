import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./_style.css";
import { iniciarSesion } from "./utils";

import Header from "../../_header/_component";

/**
 * Formulario de Inicio de Sesión
 * @window
 */
export default function LogIn() {
  const history = useHistory();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");

  async function submit() {
    const resLogIn = await iniciarSesion(correo, contrasenia).catch((err) => {
      const { errCorreo = "", errContrasenia = "" } = err.response.data;
      setErrCorreo(errCorreo);
      setErrContrasenia(errContrasenia);
    });
    if (!resLogIn) return;

    history.goBack();
  }

  return (
    <>
      <Header logoLink="/" />

      <main
        id="login"
        className="d-flex align-items-center justify-content-center"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
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
            <Link to="/registro" replace>
              <button className="btn registro-btn mt-1 w-100">
                Registrarme
              </button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
