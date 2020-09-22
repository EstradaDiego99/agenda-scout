import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import bcrypt from "bcryptjs";
import { seccionesNombreConjunto, listaGeneros } from "../globals";
import { es } from "date-fns/locale";
import "./registro-miembro.component.css";
import "react-datepicker/dist/react-datepicker.css";

export default function RegistroMiembro(props) {
  const [CUM, setCUM] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreSelva, setNombreSelva] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    new Date("2000/01/01")
  );
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

  const [errorSeccionMissing, setErrorSeccionMissing] = useState(false);
  const [errorCUM, setErrorCUM] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorNombreSelva, setErrorNombreSelva] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasenia, setErrorContrasenia] = useState("");
  const [errorProvincia, setErrorProvincia] = useState("");
  const [errorGrupo, setErrorGrupo] = useState("");

  const leerProvinciasYGrupos = async () => {
    const resProvincias = await axios.get("http://localhost:5000/provincias/");
    if (resProvincias.data.length > 0) setListaProvincias(resProvincias.data);

    const resGrupos = await axios.get("http://localhost:5000/grupos/");
    if (resGrupos.data.length > 0) setListaGrupos(resGrupos.data);
  };

  useEffect(() => {
    leerProvinciasYGrupos();
  }, []);

  const registrarInfoPersonal = () => {
    let incompleteForm = false;

    if (!nombre.length) {
      incompleteForm = true;
      setErrorNombre(`
        El nombre no puede estar vacío.
      `);
    }

    if (!apellido.length) {
      incompleteForm = true;
      setErrorApellido(`
        El apellido no puede estar vacío.
      `);
    }

    if (seccion === seccionesNombreConjunto.MANADA && !nombreSelva.length) {
      incompleteForm = true;
      setErrorNombreSelva(`
        Por favor menciona cuál es tu nombre de selva.
      `);
    }

    if (incompleteForm) {
      return;
    }

    if (!genero.length) {
      alert("Se colocará un género neutro por ahora");
      setGenero("N");
    }

    setEtapaRegistro((etapa) => etapa + 1);
  };

  const registrarInfoScout = () => {
    let incompleteForm = false;

    if (!RegExp("[A-Z0-9]{3}[0-9]{7}").test(CUM)) {
      incompleteForm = true;
      setErrorCUM(`
        CUM debe cumplir con el formato correcto. Es un código de
        10 caracteres, los últimos 7 de ellos todos números.
      `);
    }

    if (!provincia.length && !nombreNuevaProvincia.length) {
      incompleteForm = true;
      setErrorProvincia(`
        Se debe seleccionar una provincia o introducir el nombre de una nueva
        provincia.
      `);
    }

    if (provincia === "inexistente" && !nombreNuevaProvincia) {
      incompleteForm = true;
      setErrorProvincia(`
        Se debe seleccionar una provincia o introducir el nombre de una nueva
        provincia.
      `);
    }

    if (grupo === 0 && !nombreNuevoGrupo.length) {
      incompleteForm = true;
      setErrorGrupo(`
        Se debe seleccionar un grupo o introducir el número y nombre de un
        nuevo grupo.
      `);
    }

    if (grupo === -1 && !nombreNuevoGrupo.length) {
      incompleteForm = true;
      setErrorGrupo(`
        Se debe introducir el número y nombre de un nuevo grupo.
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
      setErrorGrupo(`
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

    if (!correo.length) {
      incompleteForm = true;
      setErrorCorreo(`
        El correo no puede estar vacío.
      `);
    }

    if (contrasenia.length < 8) {
      incompleteForm = true;
      setErrorContrasenia(`
        La contrasenia debe ser de minimo 8 caracteres.
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
      genero: genero,
      fechaNacimiento: fechaNacimiento,
      provincia: provincia === "inexistente" ? codigoNuevaProvincia : provincia,
      grupo: grupo < 0 ? numeroNuevoGrupo : grupo,
      seccion: seccion,
    };

    if (nombreNuevaProvincia) {
      try {
        const nuevaProvincia = {
          codigo: codigoNuevaProvincia,
          nombre: nombreNuevaProvincia,
        };
        await axios.post("http://localhost:5000/provincias/", nuevaProvincia);
        setNombreNuevaProvincia("");
      } catch (error) {
        return;
      }
    }

    if (nombreNuevoGrupo) {
      try {
        const nuevoGrupo = {
          provincia:
            provincia === "inexistente" ? codigoNuevaProvincia : provincia,
          numero: numeroNuevoGrupo,
          nombre: nombreNuevoGrupo,
        };
        await axios.post("http://localhost:5000/grupos/", nuevoGrupo);
        setNombreNuevoGrupo("");
      } catch (error) {
        return;
      }
    }

    try {
      await axios.post("http://localhost:5000/muchachos/", nuevoMuchacho);
      setEtapaRegistro((etapa) => etapa + 1);
    } catch (error) {
      if (error.response.data && error.response.data.repeatedKey) {
        const { repeatedKey } = error.response.data;
        if (repeatedKey === "CUM") {
          setErrorCUM(
            `Ya existe un registro con este CUM. ¿Lo escribiste
              correctamente?`
          );
          setEtapaRegistro(2);
        }
        if (repeatedKey === "correo") {
          setErrorCorreo(
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
      {provincia.nombre}
    </option>
  ));

  const listaOpcionesGrupos = listaGrupos
    .filter(
      (grupo) =>
        grupo.provincia ===
        (provincia === "inexistente" ? codigoNuevaProvincia : provincia)
    )
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
                      selected={fechaNacimiento}
                      onChange={(fecha) => setFechaNacimiento(fecha)}
                      dateFormat="dd/MM/yyyy"
                      locale={es}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <strong>Sección scout: </strong>
                  </label>
                  {errorSeccionMissing && (
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
                        setErrorSeccionMissing(false);
                      }}
                    />
                    <img
                      className="btn-tropa"
                      src="/images/icon-scout.svg"
                      alt="icono scout"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.TROPA);
                        setErrorSeccionMissing(false);
                      }}
                    />
                    <img
                      className="btn-comunidad"
                      src="/images/icon-caminante.svg"
                      alt="icono caminante"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.COMUNIDAD);
                        setErrorSeccionMissing(false);
                      }}
                    />
                    <img
                      className="btn-clan"
                      src="/images/icon-rover.svg"
                      alt="icono rover"
                      onClick={() => {
                        setSeccion(seccionesNombreConjunto.CLAN);
                        setErrorSeccionMissing(false);
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
                      setErrorSeccionMissing(true);
                      return;
                    }
                    if (errorSeccionMissing) return;

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
                      setErrorNombre("");
                    }}
                  />
                  <small className="text-danger">{errorNombre}</small>
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
                      setErrorApellido("");
                    }}
                  />
                  <small className="text-danger">{errorApellido}</small>
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
                          setErrorNombreSelva("");
                        }}
                      />
                    </div>
                    <small className="text-danger">{errorNombreSelva}</small>
                  </div>
                )}

                <div className="form-group">
                  <label>Género: </label>
                  <small>
                    Esto es solo para determinar qué pronombres utilizará la
                    aplicación para ti, siéntete libre de colocar lo que gustes
                    :)
                  </small>
                  <select
                    name="genero"
                    autoComplete="nope"
                    className="form-control"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <option disabled></option>
                    <option value={`${listaGeneros.FEMENINO}`} key="F">
                      Femenino
                    </option>
                    <option value={`${listaGeneros.MASCULINO}`} key="M">
                      Masculino
                    </option>
                    <option value={`${listaGeneros.NEUTRO}`} key="N">
                      Gracias, igualmente
                    </option>
                  </select>
                  <small className="text-danger">{errorGrupo}</small>
                </div>

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
                      if (listaCodigos.includes(newCUM.substring(0, 3)))
                        setProvincia(newCUM.substring(0, 3).toUpperCase());

                      setErrorCUM("");
                    }}
                  />
                  <small className="text-danger">{errorCUM}</small>
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
                      setErrorProvincia("");
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
                  <small className="text-danger">{errorProvincia}</small>
                </div>

                {provincia === "inexistente" && (
                  <div className="form-group">
                    <label>Nombre y siglas de la provincia: </label>
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
                          setErrorProvincia("");
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
                          setErrorProvincia("");
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
                      setErrorGrupo("");
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
                  <small className="text-danger">{errorGrupo}</small>
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
                          setErrorGrupo("");
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
                          setErrorGrupo("");
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
                      setErrorCorreo("");
                    }}
                  />
                  <small className="text-danger">{errorCorreo}</small>
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
                      setErrorContrasenia("");
                    }}
                  />
                  <small className="text-danger">{errorContrasenia}</small>
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
