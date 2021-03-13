import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { autenticarToken } from "../_auth/utils";
import "./_style.css";

import logo from "../logo.svg";
import Header from "../_header/_component";
import BuscadorMiembros from "./buscador";

import { seccionesENUM } from "../_utils/secciones";
const { MANADA } = seccionesENUM;

export default function Home() {
  const history = useHistory();

  const [miembro, setMiembro] = useState(undefined);

  useEffect(() => {
    async function setup() {
      const loggedUser = await autenticarToken().catch((err) => {
        console.log(JSON.stringify(err));
      });
      if (!loggedUser) {
        history.push("/login");
        return;
      }
      setMiembro(loggedUser);
    }
    setup();
  }, [history]);

  if (!miembro) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <img src={logo} alt="icon"></img>
          <p className="mt-4">Cargando información...</p>
        </div>
      </div>
    );
  }

  const nombreDisplay =
    miembro.seccion === MANADA ? miembro.nombreSelva : miembro.nombre;

  return (
    <div className={miembro.seccion}>
      <Header logoLink="/" userToShow={miembro.CUM} />

      <main id="home-component">
        <h2>Buenas {nombreDisplay}!!</h2>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div src={logo} alt="icono" className="home-icon col-10 col-md-6" />
            <BuscadorMiembros />
          </div>
        </div>
      </main>
    </div>
  );
}
