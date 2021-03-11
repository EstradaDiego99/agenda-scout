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
  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);

  const [errCUM, setErrCUM] = useState("");
  const [errProvincia, setErrProvincia] = useState("");
  const [errGrupo, setErrGrupo] = useState("");

  useEffect(() => {
    async function setup() {
      const resLista = await axios
        .get(`${backendURL}/signup/lista-provincias-grupos`)
        .catch((err) => err);
      if (resLista instanceof Error) return console.log(resLista.response.data);
      setListaProvincias(resLista.data.provincias);
      setListaGrupos(resLista.data.grupos);
    }
    setup();
  }, []);

  async function submit() {
    let foundError = false;

    const miembroValData = { CUM };
    const resValidationMiembro = await axios
      .post(`${backendURL}/signup/validate-form03-miembro`, miembroValData)
      .catch((err) => err);
    if (resValidationMiembro instanceof Error) {
      const errData = resValidationMiembro.response.data;
      setErrCUM(errData.CUM || "");
      foundError = true;
    }

    const provinciaValData = {
      provincia,
      nuevaProvincia: {
        codigo: codigoNuevaProvincia,
        nombre: nombreNuevaProvincia,
      },
    };
    const resValidationProvincia = await axios
      .post(`${backendURL}/signup/validate-form03-provincia`, provinciaValData)
      .catch((err) => err);
    if (resValidationProvincia instanceof Error) {
      setErrProvincia(resValidationProvincia.response.data);
      foundError = true;
    }

    const currProvincia =
      provincia === "NULL" ? codigoNuevaProvincia : provincia;
    const grupoValData = {
      provincia: currProvincia,
      grupo: grupo,
      nuevoGrupo: {
        provincia: currProvincia,
        numero: numeroNuevoGrupo || null,
        nombre: nombreNuevoGrupo || null,
      },
    };
    const resValidationGrupo = await axios
      .post(`${backendURL}/signup/validate-form03-grupo`, grupoValData)
      .catch((err) => err);
    if (resValidationGrupo instanceof Error) {
      setErrGrupo(resValidationGrupo.response.data);
      foundError = true;
    }

    if (!foundError) setEtapaRegistro((etapa) => etapa + 1);
  }

  function resetProvincia() {
    setProvincia("");
    setCodigoNuevaProvincia("");
    setNombreNuevaProvincia("");
    setErrProvincia("");
  }

  function resetGrupo() {
    setGrupo(0);
    setNumeroNuevoGrupo("");
    setNombreNuevoGrupo("");
    setErrGrupo("");
  }

  const gruposProvincia = listaGrupos.filter((g) => g.provincia === provincia);

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
              if (newCUM.length < 3) {
                if (!provincia) resetProvincia();
                if (!grupo) resetGrupo();
                return;
              }
              const arrCodigos = listaProvincias.map((p) => p.codigo);
              const substrCUM = newCUM.substring(0, 3).toUpperCase();
              if (!provincia && arrCodigos.includes(substrCUM))
                setProvincia(substrCUM);

              setErrCUM("");
            }}
          />
          <small className="text-danger p-1">{errCUM}</small>
        </div>

        <div className="form-group">
          <label>Provincia: </label>
          <select
            autoComplete="nope"
            className="form-control"
            value={provincia}
            onChange={(e) => {
              resetGrupo();
              resetProvincia();
              setProvincia(e.target.value);
              if (e.target.value === "NULL") {
                setCodigoNuevaProvincia(CUM.substring(0, 3).toUpperCase());
                setGrupo(-1);
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
            <option value="NULL" key="NULL">
              Mi provincia no se encuentra en esta lista
            </option>
          </select>

          {provincia === "NULL" && (
            <div className="mt-2">
              <label>Siglas y nombre de la provincia: </label>
              <small>
                Las siglas de tu provincia la puedes encontrar en los primeros
                tres caracteres de tu CUM, por ejemplo, JAL - Jalisco.
              </small>
              <div className="d-flex">
                <input
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
          <small className="text-danger p-1">{errProvincia}</small>
        </div>

        <div className="form-group">
          <label>Grupo: </label>
          <select
            autoComplete="nope"
            className={`form-control ${
              !gruposProvincia.length && "disabled-form"
            }`}
            value={grupo}
            onChange={(e) => {
              resetGrupo();
              setGrupo(parseInt(e.target.value));
            }}
          >
            <option value="0" key="0" disabled>
              Selecciona el grupo al cual perteneces
            </option>
            {gruposProvincia.map((g) => (
              <option key={g.provincia + g.numero} value={g.numero}>
                GPO {g.numero} - {g.nombre}
              </option>
            ))}
            <option value="-1" key="-1">
              Mi grupo no se encuentra en esta lista
            </option>
          </select>

          {grupo === -1 && (
            <div className="mt-2">
              <label>Número y nombre de grupo: </label>
              <div className="d-flex">
                <input
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
          <small className="text-danger p-1">{errGrupo}</small>
        </div>

        <div className="flex-grow-1"></div>

        <button type="button" className="btn btn-primary mt-4" onClick={submit}>
          Siguiente
        </button>
      </div>
    </section>
  );
}
