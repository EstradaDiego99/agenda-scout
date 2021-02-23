import React, { useState } from "react";
import axios from "axios";

import { backendURL } from "../../globals";
import { secciones, seccionesENUM } from "../../_utils/secciones";
const { MANADA } = seccionesENUM;

export default function IDOs({ selfProfile, CUM, seccion, historial }) {
  const [editMode, setEditMode] = useState(false);

  const {
    manada: { IDO: propMIDO = 0 } = {},
    tropa: { IDO: propTIDO = 0 } = {},
    comunidad: { IDO: propCIDO = 0 } = {},
    clan: { IDO: propRIDO = 0 } = {},
  } = historial;
  const [mIDO, setMIDO] = useState(propMIDO);
  const [tIDO, setTIDO] = useState(propTIDO);
  const [cIDO, setCIDO] = useState(propCIDO);
  const [rIDO, setRIDO] = useState(propRIDO);

  if (seccion === MANADA) {
    return <></>;
  }

  const {
    [seccion]: { indice: seccIndice },
  } = secciones;

  const mapManada = {
    0: (
      <img
        src={secciones.manada.imgInsigniaSeccion}
        alt="Insignia de Manada Deshabil"
        className="greyscale"
      ></img>
    ),
    1: (
      <img
        src={secciones.manada.imgInsigniaSeccion}
        alt="Insignia de Sección Manada"
      ></img>
    ),
    2: (
      <img
        src={secciones.manada.imgIDO}
        alt="Insignia Desarrollo Óptimo Manada"
      ></img>
    ),
  };
  const mapTropa = {
    0: (
      <img
        src={secciones.tropa.imgInsigniaSeccion}
        alt="Insignia de Tropa Deshabil"
        className="greyscale"
      ></img>
    ),
    1: (
      <img
        src={secciones.tropa.imgInsigniaSeccion}
        alt="Insignia de Sección Tropa"
      ></img>
    ),
    2: (
      <img
        src={secciones.tropa.imgIDO}
        alt="Insignia de Desarrollo Óptimo Tropa"
      ></img>
    ),
  };
  const mapComunidad = {
    0: (
      <img
        src={secciones.comunidad.imgInsigniaSeccion}
        alt="Insignia de Comunidad Deshabil"
        className="greyscale"
      ></img>
    ),
    1: (
      <img
        src={secciones.comunidad.imgInsigniaSeccion}
        alt="Inisgnia de Sección Comunidad"
      ></img>
    ),
    2: (
      <img
        src={secciones.comunidad.imgIDO}
        alt="Insignia de Desarrollo Óptimo Comunidad"
      ></img>
    ),
  };
  const mapClan = {
    0: (
      <img
        src={secciones.clan.imgInsigniaSeccion}
        alt="Insignia de Clan Deshabil"
        className="greyscale"
      ></img>
    ),
    1: (
      <img
        src={secciones.clan.imgInsigniaSeccion}
        alt="Insignia de Sección Clan"
      ></img>
    ),
    2: (
      <img
        src={secciones.clan.imgIDO}
        alt="Insignia de Desarrollo Óptimo Clan"
      ></img>
    ),
  };

  function saveIDOs() {
    axios
      .post(`${backendURL}/miembros/${CUM}`, {
        historial: {
          manada: { IDO: mIDO },
          tropa: { IDO: tIDO },
          comunidad: { IDO: cIDO },
          clan: { IDO: rIDO },
        },
      })
      .then(() => window.location.reload())
      .catch((err) => {
        const { msg, error } = err.response.data;
        console.log(error);
        alert(msg);
      });
  }

  const noData = mIDO === 0 && tIDO === 0 && cIDO === 0 && rIDO === 0;
  if (noData) {
    if (!selfProfile) return <></>;

    if (!editMode) {
      return (
        <section className="pt-2 pb-2 mb-4 text-center">
          <h5 className="w-100">Historial de Secciones</h5>
          <div
            className="btn btn-large edit-button"
            onClick={() => setEditMode(true)}
          >
            <span className="flex-grow-1">Editar historial</span>
            <span className="material-icons">create</span>
          </div>
        </section>
      );
    }
  }

  if (editMode) {
    return (
      <section className="pt-2 pb-2 mb-4 text-center">
        <h5 className="w-100">Editar Historial de Secciones</h5>
        <div className="ido-container">
          {seccIndice > 1 && (
            <button className="p-0" onClick={() => setMIDO((mIDO + 1) % 3)}>
              {mapManada[mIDO]}
            </button>
          )}
          {seccIndice > 2 && (
            <button className="p-0" onClick={() => setTIDO((tIDO + 1) % 3)}>
              {mapTropa[tIDO]}
            </button>
          )}
          {seccIndice > 3 && (
            <button className="p-0" onClick={() => setCIDO((cIDO + 1) % 3)}>
              {mapComunidad[cIDO]}
            </button>
          )}
          {seccIndice >= 4 && (
            <button className="p-0" onClick={() => setRIDO((rIDO + 1) % 3)}>
              {mapClan[rIDO]}
            </button>
          )}
        </div>
        <div
          className="btn btn-large edit-button"
          onClick={() => {
            setMIDO(propMIDO);
            setTIDO(propTIDO);
            setCIDO(propCIDO);
            setRIDO(propRIDO);
            setEditMode(false);
          }}
        >
          <span className="flex-grow-1">Cancelar</span>
          <span className="material-icons">close</span>
        </div>
        <div className="btn btn-large edit-button" onClick={saveIDOs}>
          <span className="flex-grow-1">Guardar cambios</span>
          <span className="material-icons">save</span>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-2 pb-2 mb-4 text-center">
      <h5 className="w-100">Historial de Secciones</h5>
      <div className="ido-container">
        {mIDO > 0 && seccIndice > 1 && mapManada[mIDO]}
        {tIDO > 0 && seccIndice > 2 && mapTropa[tIDO]}
        {cIDO > 0 && seccIndice > 3 && mapComunidad[cIDO]}
        {rIDO > 0 && seccIndice >= 4 && mapClan[rIDO]}
      </div>
      {selfProfile && (
        <div
          className="btn btn-large edit-button"
          onClick={() => setEditMode(true)}
        >
          <span className="flex-grow-1">Editar historial</span>
          <span className="material-icons">create</span>
        </div>
      )}
    </section>
  );
}
