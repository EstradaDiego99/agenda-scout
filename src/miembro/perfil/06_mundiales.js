import React, { useState } from "react";
import axios from "axios";

import { backendURL } from "../../globals";
import {
  ISMMA as imgISMMA,
  scoutsDelMundo as imgScoutsDelMundo,
  mensajerosPaz as imgMensajerosPaz,
} from "../../_utils/insignias";
import { seccionesENUM } from "../../_utils/secciones";
const { MANADA, TROPA, COMUNIDAD, CLAN } = seccionesENUM;

export default function InsigniasMundiales({
  selfProfile,
  CUM,
  seccion,
  historial,
}) {
  const [editMode, setEditMode] = useState(false);

  const {
    ismma: {
      manada: hIsmmaManada = false,
      tropa: hIsmmaTropa = false,
      ramaMayor: hIsmmaRamaMayor = false,
    } = {},
  } = historial;
  const [ismmaManada, setIsmmaManada] = useState(hIsmmaManada);
  const [ismmaTropa, setIsmmaTropa] = useState(hIsmmaTropa);
  const [ismmaRamaMayor, setIsmmaRamaMayor] = useState(hIsmmaRamaMayor);

  const { scoutsDelMundo: hScoutsDelMundo = false } = historial;
  const [scoutsDelMundo, setScoutsDelMundo] = useState(hScoutsDelMundo);

  const { mensajerosPaz: hMensajerosPaz = false } = historial;
  const [mensajerosPaz, setMensajerosPaz] = useState(hMensajerosPaz);

  function saveIDOs() {
    axios
      .post(`${backendURL}/miembros/${CUM}`, {
        historial: {
          ismma: {
            manada: ismmaManada,
            tropa: ismmaTropa,
            ramaMayor: ismmaRamaMayor,
          },
          scoutsDelMundo,
          mensajerosPaz,
        },
      })
      .then(() => window.location.reload())
      .catch((err) => {
        const { msg, error } = err.response.data;
        console.log(error);
        alert(msg);
      });
  }

  const mapISMMA = {
    default: (
      <img
        src={imgISMMA.manada}
        alt="Insignia Scout Mundial del Medio Ambiente Deshabilitada"
        className="greyscale"
      ></img>
    ),
    manada: (
      <img
        src={imgISMMA.manada}
        alt="Insignia Scout Mundial del Medio Ambiente Manada"
      ></img>
    ),
    tropa: (
      <img
        src={imgISMMA.tropa}
        alt="Insignia Scout Mundial del Medio Ambiente Tropa"
      ></img>
    ),
    ramaMayor: (
      <img
        src={imgISMMA.ramaMayor}
        alt="Insignia Scout Mundial del Medio Ambiente Rama Mayor"
      ></img>
    ),
  };
  const mapScoutsDelMundo = {
    deshabil: (
      <img
        src={imgScoutsDelMundo}
        alt="Insignia Scouts del Mundo Deshabil"
        className="greyscale"
      ></img>
    ),
    habil: (
      <img
        src={imgScoutsDelMundo}
        alt="Insignia Scouts del Mundo Deshábil"
      ></img>
    ),
  };
  const mapMensajerosPaz = {
    deshabil: (
      <img
        src={imgMensajerosPaz}
        alt="Insignia Mensajeros de la Paz"
        className="greyscale"
      ></img>
    ),
    habil: (
      <img src={imgMensajerosPaz} alt="Insignia Mensajeros de la Paz"></img>
    ),
  };

  const ismmaBoolMap = {
    [MANADA]: ismmaManada,
    [TROPA]: ismmaTropa,
    [COMUNIDAD]: ismmaRamaMayor,
    [CLAN]: ismmaRamaMayor,
  };
  const noData = !ismmaBoolMap[seccion] && !scoutsDelMundo && !mensajerosPaz;

  if (noData) {
    if (!selfProfile) return <></>;

    if (!editMode) {
      return (
        <section className="pt-2 pb-2 mb-4 text-center">
          <h5 className="w-100">Insignias Mundiales</h5>
          <div
            className="btn btn-large edit-button"
            onClick={() => setEditMode(true)}
          >
            <span className="flex-grow-1">Editar insignias</span>
            <span className="material-icons">create</span>
          </div>
        </section>
      );
    }
  }

  if (editMode) {
    return (
      <section className="pt-2 pb-2 mb-4 text-center">
        <h5 className="w-100">Editar Insignias Mundiales</h5>
        <div className="insignias-mundiales-container edit-mode mb-2">
          {seccion === MANADA && (
            <button
              className="p-0"
              onClick={() => setIsmmaManada(!ismmaManada)}
            >
              {ismmaManada ? mapISMMA.manada : mapISMMA.default}
            </button>
          )}
          {seccion === TROPA && (
            <button className="p-0" onClick={() => setIsmmaTropa(!ismmaTropa)}>
              {ismmaTropa ? mapISMMA.tropa : mapISMMA.default}
            </button>
          )}
          {(seccion === COMUNIDAD || seccion === CLAN) && (
            <button
              className="p-0"
              onClick={() => setIsmmaRamaMayor(!ismmaRamaMayor)}
            >
              {ismmaRamaMayor ? mapISMMA.ramaMayor : mapISMMA.default}
            </button>
          )}
          <button
            className="p-0"
            onClick={() => setMensajerosPaz(!mensajerosPaz)}
          >
            {mensajerosPaz ? mapMensajerosPaz.habil : mapMensajerosPaz.deshabil}
          </button>
          {seccion === CLAN && (
            <button
              className="p-0"
              onClick={() => setScoutsDelMundo(!scoutsDelMundo)}
            >
              {scoutsDelMundo
                ? mapScoutsDelMundo.habil
                : mapScoutsDelMundo.deshabil}
            </button>
          )}
        </div>
        <div
          className="btn btn-large edit-button"
          onClick={() => {
            setIsmmaManada(hIsmmaManada);
            setIsmmaTropa(hIsmmaTropa);
            setIsmmaRamaMayor(hIsmmaRamaMayor);
            setScoutsDelMundo(hScoutsDelMundo);
            setMensajerosPaz(hMensajerosPaz);
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
      <h5 className="w-100">Insignias Mundiales</h5>
      <div className="insignias-mundiales-container">
        {seccion === MANADA && ismmaManada && (
          <div className="p-0">{mapISMMA.manada}</div>
        )}
        {seccion === TROPA && ismmaTropa && (
          <div className="p-0">{mapISMMA.tropa}</div>
        )}
        {(seccion === COMUNIDAD || seccion === CLAN) && ismmaRamaMayor && (
          <div className="p-0">{mapISMMA.ramaMayor}</div>
        )}
        {mensajerosPaz && <div className="p-0">{mapMensajerosPaz.habil}</div>}
        {seccion === CLAN && scoutsDelMundo && (
          <div className="p-0">{mapScoutsDelMundo.habil}</div>
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
