import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { seccionesNombreConjunto, backendURL } from "../globals";
import "./home.component.css";

export default function Home() {
  const [miembro, setMiembro] = useState(undefined);

  const autenticarToken = async () => {
    try {
      const authResponse = await axios.post(`${backendURL}/authenticate/`, {
        token: Cookies.get("cum_token"),
      });
      const loggedCUM = authResponse.data.jwtVerification.CUM;
      const loggedMiembro = await axios.get(
        `${backendURL}/muchachos/${loggedCUM}`
      );
      if (!loggedMiembro.data) {
        const error = new Error();
        error.response = { status: 410 };
        throw error;
      }
      setMiembro(loggedMiembro.data);
    } catch (error) {
      window.location = "/login";
    }
  };

  const borrarSesion = () => {
    Cookies.remove("cum_token");
    window.location = "/login";
  };

  useEffect(() => {
    autenticarToken();
  }, []);

  return (
    <div className={miembro ? miembro.seccion : ""}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">
          <img src="/images/mi-agenda-label.svg" alt="home"></img>
        </a>
        <button className="logout-container" onClick={borrarSesion}>
          <i className="input-group-text material-icons logout">exit_to_app</i>
        </button>
      </nav>

      <main id="home-component">
        {miembro && (
          <>
            <h2>
              Buenas{" "}
              {miembro.seccion === seccionesNombreConjunto.MANADA
                ? miembro.nombreSelva
                : miembro.nombre}
              !!
            </h2>
            <div className="flex-grow-1" />
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div
                  src="/images/mi-agenda-label.svg"
                  alt="icono"
                  className="home-icon col-10 col-md-6"
                />
                <small className="col-12 col-md-6 mt-4">
                  Holi, aún no hemos programado nada aquí, jeje.
                  <br />
                  <br />
                  Pero muchísimas gracias por registrarte :D. Significa
                  muchísimo para nosotros, esperamos pronto este proyecto llegue
                  bastante lejos :)
                  <br />
                  <br />
                  Pronto agregaremos más cosas!! Como un perfil que puedas
                  observar, agregar las insignias que has conseguido en tu vida
                  scout, y mucho más!!
                  <br />
                  <br />
                  <span style={{ fontSize: "0.75em" }}>
                    (Pls vuelve eventualmente, estará chido, lo prometemos :'v)
                  </span>
                </small>
              </div>
            </div>
            <div className="flex-grow-1" />
          </>
        )}
      </main>
    </div>
  );
}
