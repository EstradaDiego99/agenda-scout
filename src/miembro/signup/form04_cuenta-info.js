import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../../globals";

/**
 * Contiene la información relacionada a la cuenta.
 * @component
 * @param {Object} props Propiedades que le asignamos al componente
 * @param {string} props.correo Correo electrónico que se registrará
 * @param {Function} props.setCorreo Actualizar el correo electrónico
 * @param {string} props.contrasenia Contraseña que se utilizará
 * @param {Function} props.setContrasenia Actualizar la contraseña
 * @param {Function} props.registrarMiembro Finalizar formulario. Muy importante
 */
export default function FormInfoCuenta({
  correo,
  setCorreo,
  contrasenia,
  setContrasenia,
  registrarMiembro,
}) {
  const [contraseniaVerif, setContraseniaVerif] = useState("");

  const [listaCorreos, setListaCorreos] = useState([]);

  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");

  useEffect(() => {
    async function setup() {
      const resMiembros = await axios
        .get(`${backendURL}/miembros/`)
        .catch((err) => console.log(JSON.stringify(err)));
      if (resMiembros.data.length > 0) {
        setListaCorreos(resMiembros.data.map((m) => m.correo));
      }
    }
    setup();
  }, []);

  function submit() {
    let incompleteForm = false;

    if (!correo) {
      incompleteForm = true;
      setErrCorreo(`
        El correo no puede estar vacío.
      `);
    }

    if (listaCorreos.includes(correo)) {
      incompleteForm = true;
      setErrCorreo(`
        Este correo ya se encuentra registrado. ¿No querrás iniciar sesión?
      `);
    }

    if (contrasenia.length < 8) {
      incompleteForm = true;
      setErrContrasenia(`
        La contrasenia debe ser de minimo 8 caracteres.
      `);
    }

    if (contrasenia !== contraseniaVerif) {
      incompleteForm = true;
      setErrContrasenia(`
        Las contraseñas deben coincidir.
      `);
    }

    if (incompleteForm) return;

    registrarMiembro();
  }

  return (
    <section id="cuenta-info-form" className="card">
      <div className="card-body">
        <div className="form-group">
          <label>Correo electrónico: </label>
          <small>Con este podrás iniciar sesión más adelante</small>
          <input
            type="email"
            autoComplete="off"
            className="form-control"
            value={correo}
            placeholder="tu@correo"
            onChange={(e) => {
              setCorreo(e.target.value);
              setErrCorreo("");
            }}
          />
          <small className="text-danger">{errCorreo}</small>
        </div>

        <div className="form-group">
          <label>Contraseña: </label>
          <input
            type="password"
            autoComplete="off"
            className="form-control"
            value={contrasenia}
            onChange={(e) => {
              setContrasenia(e.target.value);
              setErrContrasenia("");
            }}
          />
          <label>Confirma tu contraseña: </label>
          <input
            type="password"
            autoComplete="off"
            className="form-control"
            value={contraseniaVerif}
            onChange={(e) => {
              setContraseniaVerif(e.target.value);
              setErrContrasenia("");
            }}
          />
          <small className="text-danger">{errContrasenia}</small>
        </div>

        <div className="flex-grow-1"></div>

        <button type="button" className="btn btn-primary mt-4" onClick={submit}>
          Registrarme
        </button>
      </div>
    </section>
  );
}
