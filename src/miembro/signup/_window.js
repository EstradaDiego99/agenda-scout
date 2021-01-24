import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import bcrypt from "bcryptjs";
import { seccionesNombreConjunto, backendURL } from "../../globals";
import "./_style.css";

export default function SignUp() {
  const [CUM, setCUM] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreSelva, setNombreSelva] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [contraseniaVerif, setContraseniaVerif] = useState("");
  const [fecNacimiento, setNacimiento] = useState(new Date("2000/01/01"));
  const [provincia, setProvincia] = useState("");
  const [grupo, setGrupo] = useState(0);
  const [seccion, setSeccion] = useState(seccionesNombreConjunto.DEFAULT);

  const [codigoNuevaProvincia, setCodigoNuevaProvincia] = useState("");
  const [nombreNuevaProvincia, setNombreNuevaProvincia] = useState("");
  const [numeroNuevoGrupo, setNumeroNuevoGrupo] = useState("");
  const [nombreNuevoGrupo, setNombreNuevoGrupo] = useState("");

  const [listaProvincias, setListaProvincias] = useState([]);
  const [listaGrupos, setListaGrupos] = useState([]);
  const [etapaRegistro, setEtapaRegistro] = useState(0);

  const [errNoSeccion, setErrNoSeccion] = useState(false);
  const [errCUM, setErrCUM] = useState("");
  const [errNombre, setErrNombre] = useState("");
  const [errApellido, setErrApellido] = useState("");
  const [errNombreSelva, setErrNombreSelva] = useState("");
  const [errCorreo, setErrCorreo] = useState("");
  const [errContrasenia, setErrContrasenia] = useState("");
  const [errProvincia, setErrProvincia] = useState("");
  const [errGrupo, setErrGrupo] = useState("");

  useEffect(() => {
    async function leerProvinciasYGrupos() {
      const resProvincias = await axios
        .get(`${backendURL}/provincias/`)
        .catch((err) => console.log(JSON.stringify(err)));
      if (resProvincias.data.length > 0) {
        resProvincias.data.sort((a, b) =>
          a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
        );
        setListaProvincias(resProvincias.data);
      }

      const resGrupos = await axios.get(`${backendURL}/grupos/`);
      if (resGrupos.data.length > 0) {
        resGrupos.data.sort((a, b) =>
          a.numero > b.numero ? 1 : b.numero > a.numero ? -1 : 0
        );
        setListaGrupos(resGrupos.data);
      }
    }
    leerProvinciasYGrupos();
  }, []);

  const registrarInfoPersonal = () => {
    let incompleteForm = false;

    if (!nombre.length) {
      incompleteForm = true;
      setErrNombre(`
        El nombre no puede estar vacío.
      `);
    }

    if (!apellido.length) {
      incompleteForm = true;
      setErrApellido(`
        El apellido no puede estar vacío.
      `);
    }

    if (seccion === seccionesNombreConjunto.MANADA && !nombreSelva.length) {
      incompleteForm = true;
      setErrNombreSelva(`
        Por favor menciona cuál es tu nombre de selva.
      `);
    }

    if (incompleteForm) {
      return;
    }

    setEtapaRegistro((etapa) => etapa + 1);
  };

  const registrarInfoScout = () => {
    let incompleteForm = false;

    if (!RegExp("[A-Z0-9]{3}[0-9]{7}").test(CUM)) {
      incompleteForm = true;
      setErrCUM(`
        CUM debe cumplir con el formato correcto. Es un código de
        10 caracteres, los últimos 7 de ellos todos números.
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
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let incompleteForm = false;

    if (!correo) {
      incompleteForm = true;
      setErrCorreo(`
        El correo no puede estar vacío.
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

    const contraseniaHash = await bcrypt.hash(contrasenia, 10);

    const nuevoMuchacho = {
      CUM: CUM,
      nombre: nombre,
      apellido: apellido,
      nombreSelva: nombreSelva,
      correo: correo,
      contrasenia: contraseniaHash,
      fechaNacimiento: fecNacimiento,
      provincia: provincia === "inexistente" ? codigoNuevaProvincia : provincia,
      grupo: grupo < 0 ? numeroNuevoGrupo : grupo,
      seccion: seccion,
    };

    if (nombreNuevaProvincia) {
      const resProvincia = await axios
        .post(`${backendURL}/provincias/`, {
          codigo: codigoNuevaProvincia,
          nombre: nombreNuevaProvincia,
        })
        .catch((_) => {});
      if (!resProvincia) return;
      setNombreNuevaProvincia("");
    }

    if (nombreNuevoGrupo) {
      try {
        const nuevoGrupo = {
          provincia:
            provincia === "inexistente" ? codigoNuevaProvincia : provincia,
          numero: numeroNuevoGrupo,
          nombre: nombreNuevoGrupo,
        };
        await axios.post(`${backendURL}/grupos/`, nuevoGrupo);
        setNombreNuevoGrupo("");
      } catch (err) {
        return;
      }
    }

    try {
      await axios.post(`${backendURL}/muchachos/`, nuevoMuchacho);
      setEtapaRegistro((etapa) => etapa + 1);
    } catch (err) {
      if (err.response.data && err.response.data.repeatedKey) {
        const { repeatedKey } = err.response.data;
        if (repeatedKey === "CUM") {
          setErrCUM(
            `Ya existe un registro con este CUM. ¿Lo escribiste
              correctamente?`
          );
          setEtapaRegistro(2);
        }
        if (repeatedKey === "correo") {
          setErrCorreo(
            `Ya existe un registro con este correo. ¿No querrás iniciar sesión
              en realidad?`
          );
        }
      }
      return;
    }
  };

  const listaOpcionesProvincias = listaProvincias.map((provincia) => (
    <option key={provincia.codigo} value={provincia.codigo}>
      {provincia.codigo} - {provincia.nombre}
    </option>
  ));

  const listaOpcionesGrupos = listaGrupos
    .filter((grupo) => grupo.provincia === provincia)
    .map((grupo) => (
      <option key={grupo.provincia + grupo.numero} value={grupo.numero}>
        GPO {grupo.numero} - {grupo.nombre}
      </option>
    ));

  return (
    <div className={seccion}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">
          <img src="/images/mi-agenda-label.svg" alt="home"></img>
        </a>
      </nav>

      <main id="registro-component">
        <form onSubmit={onSubmit} autoComplete="off">
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
            <div id="edad-form" className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>
                    <strong>Fecha de Nacimiento: </strong>
                  </label>
                  <div>
                    <DatePicker
                      selected={fecNacimiento}
                      onChange={(fecha) => setNacimiento(fecha)}
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
                        setSeccion(seccionesNombreConjunto.MANADA);
                        setErrNoSeccion(false);
                      }}
                    />
                    <img
                      className="btn-tropa"
                      src="/images/icon-scout.svg"
                      alt="icono scout"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.TROPA);
                        setErrNoSeccion(false);
                      }}
                    />
                    <img
                      className="btn-comunidad"
                      src="/images/icon-caminante.svg"
                      alt="icono caminante"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.COMUNIDAD);
                        setErrNoSeccion(false);
                      }}
                    />
                    <img
                      className="btn-clan"
                      src="/images/icon-rover.svg"
                      alt="icono rover"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.CLAN);
                        setErrNoSeccion(false);
                      }}
                    />
                  </div>
                  {seccion === seccionesNombreConjunto.MANADA && (
                    <div id="consentimiento-container" className="mt-1">
                      <small>
                        Se debe contar con un adulto responsable al momento de
                        llenar este registro. Favor de continuar una vez se esté
                        en compañía de aquel encargado del lobato scout.
                      </small>
                    </div>
                  )}
                </div>

                <div className="flex-grow-1"></div>

                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={() => {
                    if (seccion === seccionesNombreConjunto.DEFAULT) {
                      setErrNoSeccion(true);
                      return;
                    }
                    if (errNoSeccion) return;

                    if (seccion === seccionesNombreConjunto.MANADA) {
                      alert(
                        "Recuerda llenar este formulario en conjunto con un adulto responsable."
                      );
                    }

                    setEtapaRegistro((etapa) => etapa + 1);
                  }}
                >
                  Comenzar registro
                </button>
              </div>
            </div>
          )}

          {etapaRegistro === 1 && (
            <div id="personal-info-form" className="card">
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
                      Tu nombre real no será mostrado a nadie mas que a tu Akela
                      y superiores
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

                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={() => registrarInfoPersonal()}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {etapaRegistro === 2 && (
            <div id="datos-form" className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>CUM: </label>
                  <small>
                    Lo puedes encontrar en tu credencial scout vigente. Es un
                    código de 10 caracteres.
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
                    {listaOpcionesProvincias}
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
                      Las siglas de tu provincia la puedes encontrar en los
                      primeros tres caracteres de tu CUM, por ejemplo, JAL -
                      Jalisco.
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
                    {listaOpcionesGrupos}
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

                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={() => registrarInfoScout()}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {etapaRegistro === 3 && (
            <div id="scout-info-form" className="card">
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

                <input
                  type="submit"
                  value="Registrarme"
                  className="btn btn-primary mt-4"
                />
              </div>
            </div>
          )}

          {etapaRegistro === 4 && (
            <div id="personal-info-form" className="card">
              <div className="card-body justify-content-center">
                <p className="text-center">
                  Se ha completado registro correctamente :D
                </p>
                <input
                  type="submit"
                  value="Inicio de Sesión"
                  className="btn btn-primary mt-4"
                  onClick={() => (window.location = "/login")}
                />
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
