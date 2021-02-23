import React, { useState } from "react";
import axios from "axios";

import { backendURL } from "../../../globals";
import {
  progresiones,
  hombreVitruvio,
  vidaAlAireLibre,
} from "../../../_utils/insignias";

export default function InsigniasClan({ selfProfile, CUM, historial, ismma }) {
  const [editMode, setEditMode] = useState(false);

  const { progresion: hProgresion = 0 } = historial;
  const [progresion, setProgresion] = useState(hProgresion);

  const { competencias: hCompetencias = 0 } = historial;
  const [competencias, setCompetencias] = useState(hCompetencias);

  const { IVAL: hIVAL = 0 } = historial;
  const [IVAL, setIVAL] = useState(hIVAL);

  function cancelarEdiciones() {
    setProgresion(hProgresion);
    setCompetencias(hCompetencias);
    setIVAL(hIVAL);
    setEditMode(false);
  }

  function saveInsignias() {
    axios
      .post(`${backendURL}/miembros/${CUM}`, {
        historial: { clan: { progresion, competencias, IVAL } },
      })
      .then(() => window.location.reload())
      .catch((err) => {
        const { msg, error } = err.response.data;
        console.log(error);
        alert(msg);
      });
  }

  const noData = !progresion && !competencias && !IVAL;
  if (noData) {
    if (!selfProfile) return <></>;

    if (!editMode) {
      return (
        <section className="pt-2 pb-2 mb-4 text-center">
          <h5 className="w-100">Insignias en Sección</h5>
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

  const colorMap = ["Amarilla", "Verde", "Azul", "Roja"];
  const progresionesMap = [
    "Horquilla Amarilla",
    "Horquilla Verde",
    "Horquilla Azul",
    "Horquilla Roja",
  ];

  const imgProgresion = !progresion ? (
    <img
      src={progresiones.clan[0]}
      alt="Ninguna progresión"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={progresiones.clan[progresion - 1]}
      alt={progresionesMap[progresion - 1]}
    ></img>
  );

  const imgIVAL = !IVAL ? (
    <img
      src={vidaAlAireLibre[0]}
      alt="Insignia de Vida al Aire Libre Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={vidaAlAireLibre[IVAL - 1]}
      alt={`Insignia de Vida al Aire Libre ${colorMap[IVAL - 1]}`}
    ></img>
  );

  const imgCompetencias = !competencias ? (
    <img
      src={hombreVitruvio[0]}
      alt="Ninguna competencia"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={hombreVitruvio[competencias - 1]}
      alt={`Hombre Vitruvio ${progresionesMap[competencias - 1]}`}
    ></img>
  );

  if (editMode) {
    return (
      <section className="pt-2 pb-2 mb-4 text-center">
        <h5 className="w-100">Editar Historial de Secciones</h5>
        <div className="insignias-manga-container clan edit-mode">
          <div className="competencias-container">
            <button
              className="progresion"
              onClick={() => setProgresion((progresion + 1) % 5)}
            >
              {imgProgresion}
            </button>
            <button className="IVAL" onClick={() => setIVAL((IVAL + 1) % 5)}>
              {imgIVAL}
            </button>
            <button
              className="competencias"
              onClick={() => setCompetencias((competencias + 1) % 5)}
            >
              {imgCompetencias}
            </button>
          </div>
        </div>
        <div className="btn btn-large edit-button" onClick={cancelarEdiciones}>
          <span className="flex-grow-1">Cancelar</span>
          <span className="material-icons">close</span>
        </div>
        <div className="btn btn-large edit-button" onClick={saveInsignias}>
          <span className="flex-grow-1">Guardar cambios</span>
          <span className="material-icons">save</span>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-2 pb-2 mb-4 text-center">
      <h5 className="w-100">Historial en Sección</h5>
      <div className="insignias-manga-container clan">
        {!noData && (
          <div className="competencias-container">
            {progresion && <div className="progresion">{imgProgresion}</div>}
            {!!IVAL && <div className="IVAL">{imgIVAL}</div>}
            {!!competencias && (
              <div className="competencias">{imgCompetencias}</div>
            )}
          </div>
        )}
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
