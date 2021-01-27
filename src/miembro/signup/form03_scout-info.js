import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../../globals";

export default function FormInfoScout({
  setEtapaRegistro,
  CUM,
  setCUM,
  provincia,
  setProvincia,
  grupo,
  setGrupo,
  codigoNuevaProvincia,
  setCodigoNuevaProvincia,
  nombreNuevaProvincia,
  setNombreNuevaProvincia,
  numeroNuevoGrupo,
  setNumeroNuevoGrupo,
  nombreNuevoGrupo,
  setNombreNuevoGrupo,
}) {
  const [listaCUMs, setListaCUMs] = useState([]);
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);

  const [errCUM, setErrCUM] = useState("");
  const [errProvincia, setErrProvincia] = useState("");
  const [errGrupo, setErrGrupo] = useState("");

  useEffect(() => {
    async function setup() {
      const resProvincias = await axios
        .get(`${backendURL}/provincias/`)
        .catch((err) => console.log(JSON.stringify(err)));
      if (resProvincias.data.length > 0) {
        resProvincias.data.sort((a, b) =>
          a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
        );
        setListaProvincias(resProvincias.data);
      }

      const resGrupos = await axios
        .get(`${backendURL}/grupos/`)
        .catch((err) => console.log(JSON.stringify(err)));
      if (resGrupos.data.length > 0) {
        resGrupos.data.sort((a, b) =>
          a.numero > b.numero ? 1 : b.numero > a.numero ? -1 : 0
        );
        setListaGrupos(resGrupos.data);
      }

      const resMiembros = await axios
        .get(`${backendURL}/miembros/`)
        .catch((err) => console.log(JSON.stringify(err)));
      if (resMiembros.data.length > 0) {
        setListaCUMs(resMiembros.data.map((m) => m.CUM));
      }
    }
    setup();
  }, []);

  function submit() {
    let incompleteForm = false;

    if (!RegExp("[A-Z0-9]{3}[0-9]{7}").test(CUM)) {
      incompleteForm = true;
      setErrCUM(`
        CUM debe cumplir con el formato correcto. Es un código de
        10 caracteres, los últimos 7 de ellos todos números.
      `);
    }

    if (listaCUMs.includes(CUM)) {
      incompleteForm = true;
      setErrCUM(`
        Este CUM ya se encuentra registrado. ¿No querrás iniciar sesión?
      `);
    }

    if (!provincia) {
      incompleteForm = true;
      setErrProvincia(`
        Se debe seleccionar una provincia o introducir el código y nombre de una
        nueva provincia.
      `);
    }

    if (
      provincia === "inexistente" &&
      (!codigoNuevaProvincia || !nombreNuevaProvincia)
    ) {
      incompleteForm = true;
      setErrProvincia(`
        Se debe seleccionar una provincia o introducir el código y nombre de una
        nueva provincia.
      `);
    }

    if (
      provincia === "inexistente" &&
      listaProvincias.includes(codigoNuevaProvincia)
    ) {
      incompleteForm = true;
      setErrProvincia(`
        La provincia que intentas introducir ya existe. ¿Lo buscaste a fondo?
        ¿O tal vez te estás confundiendo de número?
      `);
    }

    if (grupo === 0) {
      incompleteForm = true;
      setErrGrupo(`
        Se debe seleccionar un grupo o introducir el número y nombre de un
        nuevo grupo.
      `);
    }

    if (grupo === -1 && (!numeroNuevoGrupo || !nombreNuevoGrupo)) {
      incompleteForm = true;
      setErrGrupo(`
        Se debe seleccionar un grupo o introducir el número y nombre de un
        nuevo grupo.
      `);
    }

    if (
      grupo === -1 &&
      listaGrupos
        .filter(
          (grupo) =>
            grupo.provincia ===
            (provincia === "inexistente" ? codigoNuevaProvincia : provincia)
        )
        .map((grupo) => grupo.numero)
        .includes(parseInt(numeroNuevoGrupo))
    ) {
      incompleteForm = true;
      setErrGrupo(`
        El grupo que intentas introducir ya existe. ¿Lo buscaste a fondo?
        ¿O tal vez te estás confundiendo de número?
      `);
    }

    if (incompleteForm) return;

    setEtapaRegistro((etapa) => etapa + 1);
  }

  return (
    <section id="scout-info-form" className="card">
      <div className="card-body">
        <div className="form-group">
          <label>CUM: </label>
          <small>
            Lo puedes encontrar en tu credencial scout vigente. Es un código de
            10 caracteres.
          </small>
          <input
            type="text"
            autoComplete="nope"
            style={{ textTransform: "uppercase" }}
            className="form-control"
            value={CUM}
            onChange={(e) => {
              const newCUM = e.target.value;
              setCUM(newCUM);
              const listaCodigos = listaProvincias.map(
                (provincia) => provincia.codigo
              );
              if (newCUM.length < 3) {
                setProvincia("");
                return;
              }
              if (listaCodigos.includes(newCUM.substring(0, 3))) {
                setProvincia(newCUM.substring(0, 3).toUpperCase());
              } else {
                setProvincia("inexistente");
              }

              setErrCUM("");
            }}
          />
          <small className="text-danger">{errCUM}</small>
        </div>

        <div className="form-group">
          <label>Provincia: </label>
          <select
            name="provincia"
            autoComplete="nope"
            className="form-control"
            value={provincia}
            onChange={(e) => {
              setProvincia(e.target.value);
              setErrProvincia("");
              if (provincia !== "inexistente") {
                setCodigoNuevaProvincia("");
                setNombreNuevaProvincia("");
                setGrupo(0);
                setNumeroNuevoGrupo("");
                setNombreNuevoGrupo("");
              }
            }}
          >
            <option value="" key="" disabled>
              Selecciona la provincia a la cual perteneces
            </option>
            {listaProvincias.map((provincia) => (
              <option key={provincia.codigo} value={provincia.codigo}>
                {provincia.codigo} - {provincia.nombre}
              </option>
            ))}
            <option value="inexistente" key="inexistente">
              Mi provincia no se encuentra en esta lista
            </option>
          </select>
          <small className="text-danger">{errProvincia}</small>
        </div>

        {provincia === "inexistente" && (
          <div className="form-group">
            <label>Siglas y nombre de la provincia: </label>
            <small>
              Las siglas de tu provincia la puedes encontrar en los primeros
              tres caracteres de tu CUM, por ejemplo, JAL - Jalisco.
            </small>
            <div className="d-flex">
              <input
                name="codigoNuevaProvincia"
                type="text"
                min="3"
                max="3"
                autoComplete="nope"
                className="form-control w-25"
                value={codigoNuevaProvincia}
                onChange={(e) => {
                  setCodigoNuevaProvincia(e.target.value);
                  setErrProvincia("");
                }}
              />
              <input
                name="nombreNuevaProvincia"
                type="text"
                autoComplete="nope"
                className="form-control flex-grow-3"
                value={nombreNuevaProvincia}
                onChange={(e) => {
                  setNombreNuevaProvincia(e.target.value);
                  setErrProvincia("");
                }}
              />
            </div>
          </div>
        )}

        <div
          className={`form-group ${
            provincia || nombreNuevaProvincia ? "" : "disabled-form"
          }`}
        >
          <label>Grupo: </label>
          <select
            name="grupo"
            autoComplete="nope"
            className="form-control"
            value={grupo}
            onChange={(e) => {
              setGrupo(parseInt(e.target.value));
              setErrGrupo("");
              if (grupo > 0) {
                setNumeroNuevoGrupo("");
                setNombreNuevoGrupo("");
              }
            }}
          >
            <option value="0" key="0" disabled>
              Selecciona el grupo al cual perteneces
            </option>
            {listaGrupos
              .filter((grupo) => grupo.provincia === provincia)
              .map((grupo) => (
                <option
                  key={grupo.provincia + grupo.numero}
                  value={grupo.numero}
                >
                  GPO {grupo.numero} - {grupo.nombre}
                </option>
              ))}
            <option value="-1" key="-1">
              Mi grupo no se encuentra en esta lista
            </option>
          </select>
          <small className="text-danger">{errGrupo}</small>
        </div>

        {grupo === -1 && (
          <div className="form-group">
            <label>Número y nombre de grupo: </label>
            <div className="d-flex">
              <input
                name="numeroNuevoGrupo"
                type="number"
                min="1"
                autoComplete="nope"
                className="form-control w-25"
                value={numeroNuevoGrupo}
                onChange={(e) => {
                  setNumeroNuevoGrupo(e.target.value);
                  setErrGrupo("");
                }}
              />
              <input
                name="nombreNuevoGrupo"
                type="text"
                autoComplete="nope"
                className="form-control flex-grow-3"
                value={nombreNuevoGrupo}
                onChange={(e) => {
                  setNombreNuevoGrupo(e.target.value);
                  setErrGrupo("");
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-grow-1"></div>

        <button type="button" className="btn btn-primary mt-4" onClick={submit}>
          Siguiente
        </button>
      </div>
    </section>
  );
}
