import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./_style.css";
import { iniciarSesion } from "./utils";

/**
 * Formulario del Inicio de Sesión
 * @window
 */
export default function LogIn() {
  const history = useHistory();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");

  /**
   * Valida la información recabada e inicia sesión
   * @param {String} correo Correo con el que se iniciará sesión
   * @param {String} contrasenia Contraseña con la que se iniciará sesión
   * @param {Function} setErrCorreo Marcar error relacionado al correo
   * @param {Function} setErrContrasenia Marcar error relacionado a la contraseña
   * @param {*} history Contenedor del historial en el navegador
   */
  async function submit() {
    if (!correo) {
      setErrCorreo("Introduce tu CUM o el correo con el que registraste");
    }

    if (!contrasenia) {
      setErrContrasenia("Introduce tu contraseña.");
    }

    if (!correo || !contrasenia) {
      return;
    }

    const resLogIn = await iniciarSesion(correo, contrasenia).catch((err) => {
      const { msg, cause } = err.response.data;
      if (cause === "correo") {
        setErrCorreo(msg);
      } else if (cause === "contrasenia") {
        setErrContrasenia(msg);
      }
    });
    if (!resLogIn) return;

    history.goBack();
  }

  return (
    <>
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
            <button
              className="btn registro-btn mt-1 w-100"
              onClick={() => history.replace("/registro")}
            >
              Registrarme
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
