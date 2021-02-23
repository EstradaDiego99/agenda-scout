import React, { useState } from "react";
import axios from "axios";

import { backendURL } from "../../globals";
import { secciones, seccionesENUM } from "../../_utils/secciones";
const { MANADA, TROPA, COMUNIDAD, CLAN } = seccionesENUM;

export default function Datos({
  selfProfile,
  CUM,
  seccion: propSeccion,
  nombre: propNombre,
  apellido: propApellido,
  nombreSelva: propNombreSelva,
  cargo: propCargo,
}) {
  const [editMode, setEditMode] = useState(false);

  const [seccion, setSeccion] = useState(propSeccion);
  const [errSeccion, setErrSeccion] = useState("");
  const [nombre, setNombre] = useState(propNombre);
  const [errNombre, setErrNombre] = useState("");
  const [apellido, setApellido] = useState(propApellido);
  const [errApellido, setErrApellido] = useState("");
  const [nombreSelva, setNombreSelva] = useState(propNombreSelva);
  const [errNombreSelva, setErrNombreSelva] = useState("");
  const [cargo, setCargo] = useState(propCargo);
  const [errCargo, setErrCargo] = useState("");

  function saveDatos() {
    let incompleteForm = false;

    if (!seccion) {
      incompleteForm = true;
      setErrSeccion("Selecciona en qué sección te encuentras.");
    }

    if (!nombre.length) {
      incompleteForm = true;
      setErrNombre("El nombre no puede estar vacío.");
    }

    if (!apellido.length) {
      incompleteForm = true;
      setErrApellido("El apellido no puede estar vacío.");
    }

    if (seccion === MANADA && !nombreSelva.length) {
      incompleteForm = true;
      setErrNombreSelva("Por favor menciona cuál es tu nombre de selva.");
    }

    if (incompleteForm) {
      return;
    }

    if (!cargo) {
      setCargo(seccionObj.individuo);
    }

    const data = {
      nombre,
      apellido,
      nombreSelva,
      seccion,
      historial: { [seccion]: { cargo } },
    };
    console.log(data);
    axios
      .post(`${backendURL}/miembros/${CUM}`, data)
      .then(() => window.location.reload())
      .catch((err) => {
        const { msg, error } = err.response.data;
        console.log(error);
        alert(msg);
      });
  }

  const nombreDisplay = seccion === MANADA ? nombreSelva : nombre;
  const { [seccion]: seccionObj } = secciones;
  const imgDistintivo =
    seccionObj.imgDistintivos[cargo || seccionObj.individuo];

  const listaCargos = Object.keys(seccionObj.imgDistintivos);
  const idxCargo =
    listaCargos.indexOf(cargo) >= 0 ? listaCargos.indexOf(cargo) : 0;

  const imgManada =
    seccion === MANADA
      ? seccionObj.imgDistintivos[cargo || seccionObj.individuo]
      : secciones.manada.imgDistintivos.lobato;
  const imgTropa =
    seccion === TROPA
      ? seccionObj.imgDistintivos[cargo || seccionObj.individuo]
      : secciones.tropa.imgDistintivos.scout;
  const imgComunidad =
    seccion === COMUNIDAD
      ? seccionObj.imgDistintivos[cargo || seccionObj.individuo]
      : secciones.comunidad.imgDistintivos.caminante;
  const imgClan =
    seccion === CLAN
      ? seccionObj.imgDistintivos[cargo || seccionObj.individuo]
      : secciones.clan.imgDistintivos.rover;

  if (editMode)
    return (
      <section className="pt-2 pb-2 mb-4 text-center">
        <form className={`${seccion} bg-transparent`}>
          <div className="form-group">
            <label>Nombre: </label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrNombre("");
              }}
            />
            <small className="text-danger">{errNombre}</small>
          </div>

          <div className="form-group">
            <label>Apellido(s): </label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={apellido}
              onChange={(e) => {
                setApellido(e.target.value);
                setErrApellido("");
              }}
            />
            <small className="text-danger">{errApellido}</small>
          </div>

          {seccion === MANADA && (
            <div className="form-group">
              <label>Nombre de selva: </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <i className="input-group-text material-icons">pets</i>
                </div>
                <input
                  type="text"
                  autoComplete="nope"
                  className="form-control"
                  value={nombreSelva}
                  onChange={(e) => {
                    setNombreSelva(e.target.value);
                    setErrNombreSelva("");
                  }}
                />
              </div>
              <small className="mb-2 text-info">
                Tu nombre real no será mostrado a nadie mas que a tu Akela y
                superiores
              </small>
              <br />
              <small className="text-danger">{errNombreSelva}</small>
            </div>
          )}

          <div className="form-group">
            <small style={{ lineHeight: "0px" }}>
              Oprime repetidamente para seleccionar el cargo
            </small>
            <div id="secciones-container" className="d-flex text-center">
              <img
                className="btn-manada"
                src={imgManada}
                alt="icono lobato"
                onClick={() => {
                  if (seccion === MANADA) {
                    setCargo(listaCargos[(idxCargo + 1) % listaCargos.length]);
                  } else {
                    setSeccion(MANADA);
                    setErrSeccion("");
                    setCargo(Object.keys(secciones[MANADA].imgDistintivos)[0]);
                  }
                  setErrCargo("");
                }}
              />
              <img
                className="btn-tropa"
                src={imgTropa}
                alt="icono scout"
                onClick={() => {
                  if (seccion === TROPA) {
                    setCargo(listaCargos[(idxCargo + 1) % listaCargos.length]);
                  } else {
                    setSeccion(TROPA);
                    setErrSeccion("");
                    setCargo(Object.keys(secciones[TROPA].imgDistintivos)[0]);
                  }
                  setErrCargo("");
                }}
              />
              <img
                className="btn-comunidad"
                src={imgComunidad}
                alt="icono caminante"
                onClick={() => {
                  if (seccion === COMUNIDAD) {
                    setCargo(listaCargos[(idxCargo + 1) % listaCargos.length]);
                  } else {
                    setSeccion(COMUNIDAD);
                    setErrSeccion("");
                    setCargo(
                      Object.keys(secciones[COMUNIDAD].imgDistintivos)[0]
                    );
                  }
                  setErrCargo("");
                }}
              />
              <img
                className="btn-clan"
                src={imgClan}
                alt="icono rover"
                onClick={() => {
                  if (seccion === CLAN) {
                    setCargo(listaCargos[(idxCargo + 1) % listaCargos.length]);
                  } else {
                    setSeccion(CLAN);
                    setErrSeccion("");
                    setCargo(Object.keys(secciones[CLAN].imgDistintivos)[0]);
                  }
                  setErrCargo("");
                }}
              />
            </div>
            <small className="text-danger">{errSeccion}</small>
            <small className="text-danger">{errCargo}</small>
          </div>

          <div
            className="btn btn-large edit-button"
            onClick={() => {
              setSeccion(propSeccion);
              setNombre(propNombre);
              setNombreSelva(propNombreSelva);
              setCargo(propCargo);
              setEditMode(false);
            }}
          >
            <span className="flex-grow-1">Cancelar</span>
            <span className="material-icons">close</span>
          </div>
          <div className="btn btn-large edit-button" onClick={saveDatos}>
            <span className="flex-grow-1">Guardar cambios</span>
            <span className="material-icons">save</span>
          </div>
        </form>
      </section>
    );

  return (
    <section className="pt-2 pb-2 mb-4">
      <div className="d-flex">
        <div className="datos-container">
          <strong style={{ fontSize: "1.5em" }}>{nombreDisplay}</strong>
          <br />
          <span className="seccLabel">{seccionObj.compIndividuo}</span>
        </div>
        <img
          src={imgDistintivo}
          alt="Distintivo"
          className="distintivo-secccion"
        ></img>
      </div>
      {selfProfile && (
        <div
          className="btn btn-large edit-button mt-2"
          onClick={() => setEditMode(true)}
        >
          <span className="flex-grow-1">Editar historial</span>
          <span className="material-icons">create</span>
        </div>
      )}
    </section>
  );
}
