import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { seccionesENUM } from "../../globals";

export default function FormEdad({
  setEtapaRegistro,
  fNacimiento,
  setFNacimiento,
  seccion,
  setSeccion,
}) {
  const [errNoSeccion, setErrNoSeccion] = useState(false);

  function submit() {
    if (errNoSeccion) return;
    if (!seccion) {
      setErrNoSeccion(true);
      return;
    }

    if (seccion === seccionesENUM.MANADA) {
      alert(
        "Recuerda llenar este formulario en conjunto con un adulto responsable."
      );
    }

    setEtapaRegistro((etapa) => etapa + 1);
  }

  return (
    <section id="edad-form" className="card">
      <div className="card-body">
        <div className="form-group">
          <label>
            <strong>Fecha de Nacimiento: </strong>
          </label>
          <div>
            <DatePicker
              selected={fNacimiento}
              onChange={(f) => setFNacimiento(f)}
              dateFormat="dd/MM/yyyy"
              locale={es}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <strong>Sección scout: </strong>
          </label>
          {errNoSeccion && (
            <div>
              <small className="text-danger">
                Es necesario seleccionar la sección a la que perteneces.
              </small>
            </div>
          )}
          <div id="secciones-container" className="d-flex">
            <img
              className="btn-manada"
              src="/images/icon-lobato.svg"
              alt="icono lobato"
              onClick={() => {
                setSeccion(seccionesENUM.MANADA);
                setErrNoSeccion(false);
              }}
            />
            <img
              className="btn-tropa"
              src="/images/icon-scout.svg"
              alt="icono scout"
              onClick={() => {
                setSeccion(seccionesENUM.TROPA);
                setErrNoSeccion(false);
              }}
            />
            <img
              className="btn-comunidad"
              src="/images/icon-caminante.svg"
              alt="icono caminante"
              onClick={() => {
                setSeccion(seccionesENUM.COMUNIDAD);
                setErrNoSeccion(false);
              }}
            />
            <img
              className="btn-clan"
              src="/images/icon-rover.svg"
              alt="icono rover"
              onClick={() => {
                setSeccion(seccionesENUM.CLAN);
                setErrNoSeccion(false);
              }}
            />
          </div>
          {seccion === seccionesENUM.MANADA && (
            <div id="consentimiento-container" className="mt-1">
              <small>
                Se debe contar con un adulto responsable al momento de llenar
                este registro. Favor de continuar una vez se esté en compañía de
                aquel encargado del lobato scout.
              </small>
            </div>
          )}
        </div>

        <div className="flex-grow-1"></div>

        <button type="button" className="btn btn-primary mt-4" onClick={submit}>
          Comenzar registro
        </button>
      </div>
    </section>
  );
}
