import React, { useState } from "react";
import { seccionesNombreConjunto } from "../../globals";

export default function FormInfoPersonal({
  setEtapaRegistro,
  seccion,
  nombre,
  setNombre,
  apellido,
  setApellido,
  nombreSelva,
  setNombreSelva,
}) {
  const [errNombre, setErrNombre] = useState("");
  const [errApellido, setErrApellido] = useState("");
  const [errNombreSelva, setErrNombreSelva] = useState("");

  function submit() {
    let incompleteForm = false;

    if (!nombre.length) {
      incompleteForm = true;
      setErrNombre("El nombre no puede estar vacío.");
    }

    if (!apellido.length) {
      incompleteForm = true;
      setErrApellido("El apellido no puede estar vacío.");
    }

    if (seccion === seccionesNombreConjunto.MANADA && !nombreSelva.length) {
      incompleteForm = true;
      setErrNombreSelva("Por favor menciona cuál es tu nombre de selva.");
    }

    if (incompleteForm) {
      return;
    }

    setEtapaRegistro((etapa) => etapa + 1);
  }

  return (
    <section id="personal-info-form" className="card">
      <div className="card-body">
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
        {seccion === seccionesNombreConjunto.MANADA && (
          <div className="form-group">
            <p className="mb-4 text-info">
              Tu nombre real no será mostrado a nadie mas que a tu Akela y
              superiores
            </p>
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
            <small className="text-danger">{errNombreSelva}</small>
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
