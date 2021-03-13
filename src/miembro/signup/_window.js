import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../globals";
import "./_style.css";
import { iniciarSesion } from "../login/utils";

import Header from "../../_header/_component";
import FormEdad from "./form01_edad";
import FormInfoPersonal from "./form02_personal-info";
import FormInfoScout from "./form03_scout-info";
import FormInfoCuenta from "./form04_cuenta-info";

export default function SignUp() {
  const history = useHistory();

  const [etapaRegistro, setEtapaRegistro] = useState(0);

  const [CUM, setCUM] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreSelva, setNombreSelva] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [fNacimiento, setFNacimiento] = useState(new Date("2000/01/01"));
  const [provincia, setProvincia] = useState("");
  const [grupo, setGrupo] = useState(0);
  const [seccion, setSeccion] = useState(undefined);

  const [codigoNuevaProvincia, setCodigoNuevaProvincia] = useState("");
  const [nombreNuevaProvincia, setNombreNuevaProvincia] = useState("");
  const [numeroNuevoGrupo, setNumeroNuevoGrupo] = useState("");
  const [nombreNuevoGrupo, setNombreNuevoGrupo] = useState("");

  async function registrarMiembro() {
    const signupData = {
      CUM,
      nombre,
      apellido,
      nombreSelva,
      correo,
      contrasenia,
      fNacimiento,
      seccion,
      provincia,
      grupo,
      nuevaProvincia: {
        codigo: codigoNuevaProvincia || null,
        nombre: nombreNuevaProvincia || null,
      },
      nuevoGrupo: {
        numero: numeroNuevoGrupo || null,
        nombre: nombreNuevoGrupo || null,
      },
    };
    const resMiembro = await axios
      .post(`${backendURL}/signup/`, signupData)
      .catch((err) => err);
    if (resMiembro instanceof Error) {
      const { msg } = resMiembro.response.data;
      alert(msg);
      return;
    }

    setEtapaRegistro((etapa) => etapa + 1);
  }

  return (
    <div className={seccion}>
      <Header showBack="true" />

      <main id="registro-component">
        <form autoComplete="off">
          {etapaRegistro !== 0 && etapaRegistro !== 4 && (
            <button
              type="button"
              className="btn btn-back"
              onClick={() => setEtapaRegistro((etapa) => etapa - 1)}
            >
              Atrás
            </button>
          )}

          {etapaRegistro === 0 && (
            <FormEdad
              {...{
                setEtapaRegistro,
                setSeccion,
                fNacimiento,
                setFNacimiento,
                seccion,
              }}
            />
          )}

          {etapaRegistro === 1 && (
            <FormInfoPersonal
              {...{
                setEtapaRegistro,
                seccion,
                nombre,
                setNombre,
                apellido,
                setApellido,
                nombreSelva,
                setNombreSelva,
              }}
            />
          )}

          {etapaRegistro === 2 && (
            <FormInfoScout
              {...{
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
              }}
            />
          )}

          {etapaRegistro === 3 && (
            <FormInfoCuenta
              {...{
                setEtapaRegistro,
                correo,
                setCorreo,
                contrasenia,
                setContrasenia,
                registrarMiembro,
              }}
            />
          )}

          {etapaRegistro === 4 && (
            <section id="confirmacion" className="card">
              <div className="card-body justify-content-center">
                <p className="text-center">
                  Se ha completado registro correctamente :D
                </p>
                <input
                  type="submit"
                  value="Iniciar de Sesión"
                  className="btn btn-primary mt-4"
                  onClick={async () => {
                    await iniciarSesion(correo, contrasenia).catch((err) => {
                      const { msg, error } = err.response.data;
                      console.log(error);
                      alert(msg);
                    });
                    history.push("/");
                  }}
                />
              </div>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}
