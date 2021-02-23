import React from "react";
import "./_style.css";

import Datos from "./01_datos";
import Registro from "./02_registro";
import IDOs from "./04_ido's";
import Insignias from "./05_insignias/_index";
import InsigniasMundiales from "./06_mundiales";

export default function Perfil({ miembro, logged }) {
  const { seccion } = miembro;
  const { nombre, apellido, nombreSelva } = miembro;
  const { historial = {} } = miembro;
  const { CUM, provincia, grupo } = miembro;

  const { cargo = "" } = historial[seccion] || {};

  const selfProfile = logged && logged.CUM === CUM;

  return (
    <main id="miembro-perfil" className={`${miembro.seccion} container`}>
      <div className="row w-100">
        <div className="col-12 col-md-6">
          <Datos
            {...{
              selfProfile,
              CUM,
              seccion,
              nombre,
              apellido,
              nombreSelva,
              cargo,
            }}
          />
          <Registro {...{ seccion, CUM, nombre, apellido, grupo, provincia }} />
        </div>
        <div className="col-12 col-md-6 mt-md-5">
          <IDOs {...{ selfProfile, CUM, seccion, historial }} />
          <Insignias {...{ selfProfile, CUM, seccion, historial }} />
          <InsigniasMundiales {...{ selfProfile, CUM, seccion, historial }} />
        </div>
      </div>
    </main>
  );
}
