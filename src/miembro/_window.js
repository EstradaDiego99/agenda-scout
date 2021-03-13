import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../globals";
import { autenticarToken } from "../_auth/utils";

import Header from "../_header/_component";
import Perfil from "./perfil/_window";

export default function Miembro() {
  const [logged, setLogged] = useState(undefined);
  const [miembro, setMiembro] = useState(undefined);

  const { CUM } = useParams();

  useEffect(() => {
    autenticarToken()
      .then((res) => setLogged(res))
      .catch((err) => {
        if (err.response) console.log(JSON.stringify(err.response.data));
      });
    axios
      .get(`${backendURL}/miembros/${CUM}`)
      .then((res) => setMiembro(res.data))
      .catch((err) => {
        if (err.response) console.log(JSON.stringify(err.response.data));
      });
  }, [CUM]);

  if (!miembro) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/mi-agenda-label.svg" alt="icon"></img>
          <p className="mt-4">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/:CUM" exact>
        <div className={logged ? logged.seccion : ""}>
          <Header
            showBack={!!logged}
            showLogout={logged && logged.CUM === miembro.CUM}
          />
          <Perfil {...{ miembro, logged }} />
        </div>
      </Route>
    </Switch>
  );
}
