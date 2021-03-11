import React, { useState } from "react";
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

  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");

  async function submit() {
    const validationData = { correo, contrasenia, contraseniaVerif };
    const resValidation = await axios
      .post(`${backendURL}/signup/validate-form04`, validationData)
      .catch((err) => err);
    if (resValidation instanceof Error) {
      const errData = resValidation.response.data;
      setErrCorreo(errData.correo || "");
      setErrContrasenia(errData.contrasenia || "");
      return;
    }
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
            className="form-control"
            autoComplete="new-password"
            value={contrasenia}
            onChange={(e) => {
              setContrasenia(e.target.value);
              setErrContrasenia("");
            }}
          />
          <label>Confirma tu contraseña: </label>
          <input
            type="password"
            className="form-control"
            autoComplete="new-password"
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
