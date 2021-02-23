import React, { useState } from "react";
import axios from "axios";

import { backendURL } from "../../../globals";
import {
  progresiones,
  especialidades,
  vidaAlAireLibre,
  IDSs as insigniasIDS,
} from "../../../_utils/insignias";

export default function InsigniasTropa({ selfProfile, CUM, historial }) {
  const [editMode, setEditMode] = useState(false);

  const { progresion: hProgresion = 0 } = historial;
  const [progresion, setProgresion] = useState(hProgresion);

  const {
    especialidades: {
      deportes: hDeportes = 0,
      ecologia: hEcologia = 0,
      expresion: hExpresion = 0,
      humanidades: hHumanidades = 0,
      seguridad: hSeguridad = 0,
      tecnologia: hTecnologia = 0,
    } = {},
  } = historial;
  const [deportes, setDeportes] = useState(hDeportes);
  const [ecologia, setEcologia] = useState(hEcologia);
  const [expresion, setExpresion] = useState(hExpresion);
  const [humanidades, setHumanidades] = useState(hHumanidades);
  const [seguridad, setSeguridad] = useState(hSeguridad);
  const [tecnologia, setTecnologia] = useState(hTecnologia);

  const { IVAL: hIVAL = 0 } = historial;
  const [IVAL, setIVAL] = useState(hIVAL);

  const {
    IDSs: {
      ambiente: hAmbiente = false,
      desarrollo: hDesarrollo = false,
      paz: hPaz = false,
    } = {},
  } = historial;
  const [ambiente, setAmbiente] = useState(hAmbiente);
  const [desarrollo, setDesarrollo] = useState(hDesarrollo);
  const [paz, setPaz] = useState(hPaz);

  function cancelarEdiciones() {
    setProgresion(hProgresion);
    setDeportes(hDeportes);
    setEcologia(hEcologia);
    setExpresion(hExpresion);
    setHumanidades(hHumanidades);
    setSeguridad(hSeguridad);
    setTecnologia(hTecnologia);
    setIVAL(hIVAL);
    setAmbiente(hAmbiente);
    setDesarrollo(hDesarrollo);
    setPaz(hPaz);
    setEditMode(false);
  }

  function saveInsignias() {
    axios
      .post(`${backendURL}/miembros/${CUM}`, {
        historial: {
          tropa: {
            progresion,
            especialidades: {
              deportes,
              ecologia,
              expresion,
              humanidades,
              seguridad,
              tecnologia,
            },
            IVAL,
            IDSs: { ambiente, desarrollo, paz },
          },
        },
      })
      .then(() => window.location.reload())
      .catch((err) => {
        const { msg, error } = err.response.data;
        console.log(error);
        alert(msg);
      });
  }

  const noDataEspecialidades =
    !progresion &&
    !deportes &&
    !ecologia &&
    !expresion &&
    !humanidades &&
    !seguridad &&
    !tecnologia &&
    !IVAL;
  const noDataIDS = !ambiente && !desarrollo && !paz;
  if (noDataEspecialidades && noDataIDS) {
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
  const progresionesMap = ["Pistas", "Senda", "Rumbo", "Travesía"];

  const imgProgresion = !progresion ? (
    <img
      src={progresiones.tropa[0]}
      alt="Ninguna progresión"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={progresiones.tropa[progresion - 1]}
      alt={progresionesMap[progresion - 1]}
    ></img>
  );

  const imgDeportes = !deportes ? (
    <img
      src={especialidades.deportes[0]}
      alt="Insignia de Deportes Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.deportes[deportes - 1]}
      alt={`Insignia de Deportes ${colorMap[deportes - 1]}`}
    ></img>
  );
  const imgEcologia = !ecologia ? (
    <img
      src={especialidades.ecologia[0]}
      alt="Insignia de Ecología Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.ecologia[ecologia - 1]}
      alt={`Insignia de Ecologia ${colorMap[ecologia - 1]}`}
    ></img>
  );
  const imgExpresion = !expresion ? (
    <img
      src={especialidades.expresion[0]}
      alt="Insignia de Expresión y Comunicación Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.expresion[expresion - 1]}
      alt={`Insignia de Expresión y Comunicación ${colorMap[expresion - 1]}`}
    ></img>
  );
  const imgHumanidades = !humanidades ? (
    <img
      src={especialidades.humanidades[0]}
      alt="Insignia de Humanidades Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.humanidades[humanidades - 1]}
      alt={`Insignia de Humanidades ${colorMap[humanidades - 1]}`}
    ></img>
  );
  const imgSeguridad = !seguridad ? (
    <img
      src={especialidades.seguridad[0]}
      alt="Insignia de Seguridad y Rescate Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.seguridad[seguridad - 1]}
      alt={`Insignia de Seguridad y Rescate ${colorMap[seguridad - 1]}`}
    ></img>
  );
  const imgTecnologia = !tecnologia ? (
    <img
      src={especialidades.tecnologia[0]}
      alt="Insignia de Tecnología y Ciencia Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={especialidades.tecnologia[tecnologia - 1]}
      alt={`Insignia de Tecnología y Ciencia ${colorMap[tecnologia - 1]}`}
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

  const imgAmbiente = !ambiente ? (
    <img
      src={insigniasIDS.tropa.ambiente.img}
      alt="Insignia de Medio Ambiente Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={insigniasIDS.tropa.ambiente.img}
      alt="Insignia de Medio Ambiente"
    ></img>
  );
  const imgDesarrollo = !desarrollo ? (
    <img
      src={insigniasIDS.tropa.desarrollo.img}
      alt="Insignia de Desarrollo Comunitario Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img
      src={insigniasIDS.tropa.desarrollo.img}
      alt="Insignia de Desarrollo Comunitario"
    ></img>
  );
  const imgPaz = !paz ? (
    <img
      src={insigniasIDS.tropa.paz.img}
      alt="Insignia de Paz Deshabilitada"
      className="greyscale"
    ></img>
  ) : (
    <img src={insigniasIDS.tropa.paz.img} alt="Insignia de Paz"></img>
  );

  if (editMode) {
    return (
      <section className="pt-2 pb-2 mb-4 text-center">
        <h5 className="w-100">Editar Historial de Secciones</h5>
        <div className="insignias-manga-container tropa edit-mode">
          <div className="especialidades-container">
            <button
              className="progresion"
              onClick={() => setProgresion((progresion + 1) % 5)}
            >
              {imgProgresion}
            </button>
            <button
              className="deportes especialidad"
              onClick={() => setDeportes((deportes + 1) % 5)}
            >
              {imgDeportes}
            </button>
            <button
              className="ecologia especialidad"
              onClick={() => setEcologia((ecologia + 1) % 5)}
            >
              {imgEcologia}
            </button>
            <button
              className="expresion especialidad"
              onClick={() => setExpresion((expresion + 1) % 5)}
            >
              {imgExpresion}
            </button>
            <button
              className="humanidades especialidad"
              onClick={() => setHumanidades((humanidades + 1) % 5)}
            >
              {imgHumanidades}
            </button>
            <button
              className="seguridad especialidad"
              onClick={() => setSeguridad((seguridad + 1) % 5)}
            >
              {imgSeguridad}
            </button>
            <button
              className="tecnologia especialidad"
              onClick={() => setTecnologia((tecnologia + 1) % 5)}
            >
              {imgTecnologia}
            </button>
            <button className="IVAL" onClick={() => setIVAL((IVAL + 1) % 5)}>
              {imgIVAL}
            </button>
          </div>
          <div className="ids-container">
            <button className="ambiente" onClick={() => setAmbiente(!ambiente)}>
              {imgAmbiente}
            </button>
            <button
              className="desarrollo"
              onClick={() => setDesarrollo(!desarrollo)}
            >
              {imgDesarrollo}
            </button>
            <button className="paz" onClick={() => setPaz(!paz)}>
              {imgPaz}
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
      <div className="insignias-manga-container tropa">
        {!noDataEspecialidades && (
          <div className="especialidades-container">
            {progresion && <div className="progresion">{imgProgresion}</div>}
            {!!deportes && (
              <div className="deportes especialidad">{imgDeportes}</div>
            )}
            {!!ecologia && (
              <div className="ecologia especialidad">{imgEcologia}</div>
            )}
            {!!expresion && (
              <div className="expresion especialidad">{imgExpresion}</div>
            )}
            {!!humanidades && (
              <div className="humanidades especialidad">{imgHumanidades}</div>
            )}
            {!!seguridad && (
              <div className="seguridad especialidad">{imgSeguridad}</div>
            )}
            {!!tecnologia && (
              <div className="tecnologia especialidad">{imgTecnologia}</div>
            )}
            {!!IVAL && <div className="IVAL">{imgIVAL}</div>}
          </div>
        )}
        {!noDataIDS && (
          <div className="ids-container">
            {!!ambiente && <div className="ambiente">{imgAmbiente}</div>}
            {!!desarrollo && <div className="desarrollo">{imgDesarrollo}</div>}
            {!!paz && <div className="paz">{imgPaz}</div>}
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
