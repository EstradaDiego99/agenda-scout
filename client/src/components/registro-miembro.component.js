import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import bcrypt from "bcryptjs";
import { seccionesNombreConjunto } from "../globals";
import "./registro-miembro.component.css";

export default class RegistroMiembro extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.validateParams = this.validateParams.bind(this);

    this.onChangeCUM = this.onChangeCUM.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeApellido = this.onChangeApellido.bind(this);
    this.onChangeFechaNacimiento = this.onChangeFechaNacimiento.bind(this);
    this.onChangeNuevaProvincia = this.onChangeNuevaProvincia.bind(this);
    this.onSelectManada = this.onSelectManada.bind(this);
    this.onSelectTropa = this.onSelectTropa.bind(this);
    this.onSelectComunidad = this.onSelectComunidad.bind(this);
    this.onSelectClan = this.onSelectClan.bind(this);
    this.onComenzarRegistro = this.onComenzarRegistro.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      CUM: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: new Date("2000/01/01"),
      provincia: "",
      grupo: 0,
      seccion: seccionesNombreConjunto.DEFAULT,

      listaProvincias: {},
      listaGrupos: [],
      listaSecciones: [],
      etapaRegistro: 0,

      nombreProvinciaInferido: "",
      provinciaNoRegistrada: false,
      nombreNuevaProvincia: "",
      displayInputNuevoGrupo: false,
      numeroNuevoGrupo: 0,
      nombreNuevoGrupo: "",

      errorSeccionMissing: false,
      errorCUM: "",
      errorNombre: "",
      errorApellido: "",
      errorProvincia: "",
    };
  }

  handleInputChange(event) {
    let { name, value } = event.target;

    if (name === "grupo") {
      value = parseInt(value);
    }
    if (name === "numeroNuevoGrupo") {
      value = parseInt(value);
    }

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/provincias/")
      .then((response) => {
        if (response.data.length > 0) {
          const listaProvincias = {};
          response.data.forEach(
            (provincia) =>
              (listaProvincias[provincia.codigo] = provincia.nombre)
          );
          this.setState({ listaProvincias: listaProvincias });
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/grupos/")
      .then((response) => {
        if (response.data.length > 0)
          this.setState({ listaGrupos: response.data });
      })
      .catch((error) => console.log(error));
  }

  onChangeCUM(e) {
    this.setState({ CUM: e.target.value.toUpperCase() });

    this.setState({ missingCUMError: false });

    if (e.target.value.length < 3) {
      this.setState({ provinciaNoRegistrada: false });
      this.setState({ nombreProvinciaInferido: "" });
      return;
    }

    if (e.target.value.substring(0, 3) in this.state.listaProvincias) {
      this.setState({ provinciaNoRegistrada: false });
      this.setState({ provincia: e.target.value.substring(0, 3) });
      this.setState({
        nombreProvinciaInferido: this.state.listaProvincias[
          e.target.value.substring(0, 3)
        ],
      });
    } else {
      this.setState({ provinciaNoRegistrada: true });
    }
  }

  onChangeNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  onChangeApellido(e) {
    this.setState({ apellido: e.target.value });
  }

  onChangeFechaNacimiento(nuevaFecha) {
    this.setState({ fechaNacimiento: nuevaFecha });
  }

  onChangeNuevaProvincia(e) {
    this.setState({ nombreNuevaProvincia: e.target.value });
  }

  onSelectSeccion() {}

  onSelectManada() {
    this.setState({ seccion: seccionesNombreConjunto.MANADA });
    this.setState({ errorSeccionMissing: false });
  }

  onSelectTropa() {
    this.setState({ seccion: seccionesNombreConjunto.TROPA });
    this.setState({ errorSeccionMissing: false });
  }

  onSelectComunidad() {
    this.setState({ seccion: seccionesNombreConjunto.COMUNIDAD });
    this.setState({ errorSeccionMissing: false });
  }

  onSelectClan() {
    this.setState({ seccion: seccionesNombreConjunto.CLAN });
    this.setState({ errorSeccionMissing: false });
  }

  onComenzarRegistro() {
    if (this.state.seccion) {
      this.setState({ etapaRegistro: this.state.etapaRegistro + 1 });
    } else {
      this.setState({ errorSeccionMissing: true });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      !(
        this.isValidCUM() &&
        this.isValidNombre() &&
        this.isValidApellido() &&
        this.isValidProvincia() &&
        this.isValidGrupo()
      )
    )
      return;

    const nuevoMuchacho = {
      CUM: this.state.CUM,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      fechaNacimiento: this.state.fechaNacimiento,
      provincia: this.state.provincia,
      grupo: this.state.grupo,
      seccion: this.state.seccion,
      nombreNuevaProvincia: this.state.nombreNuevaProvincia,
      numeroNuevoGrupo: this.state.numeroNuevoGrupo,
      nombreNuevoGrupo: this.state.nombreNuevoGrupo,
    };

    axios
      .post("http://localhost:5000/muchachos/", nuevoMuchacho)
      .then((res) => (window.location = "/"))
      .catch((error) => console.log(error));
  }

  validateParams() {
    if (!RegExp("[A-Z0-9]{3}[0-9]{7}").test(this.state.CUM))
      this.setState({
        errorCUM:
          this.state.errorCUM +
          "CUM debe cumplir con el formato correcto." +
          "Es un código de 10 caracteres," +
          "los últimos 7 de ellos todos números.",
      });

    if (!this.state.nombre.length)
      this.setState({
        errorNombre: this.state.errorNombre + "El nombre no puede estar vacío.",
      });

    if (!this.state.apellido.length)
      this.setState({
        errorApellido:
          this.state.errorApellido + "El apellido no puede estar vacío.",
      });

    if (!this.state.provincia.length && !this.state.nombreNuevaProvincia.length)
      this.setState({
        errorProvincia:
          this.state.errorProvincia +
          "Se debe introducir el nombre de una provincia",
      });

    if (this.state.grupo === 0 && !this.state.nombreNuevoGrupo.length)
      this.setState({
        errorGrupo:
          this.state.errorGrupo + "Se debe introducir el nombre del grupo",
      });
  }

  render() {
    const inputNombreProvincia = this.state.errorProvinciaInexistente ? (
      <>
        <small className="text-danger">
          Al parecer la provincia{" "}
          <strong>{this.state.CUM.substring(0, 3).toUpperCase()}</strong> no se
          encuentra registrada aún. ¿Nos ayudarías colocando el nombre completo
          de tu provincia?
        </small>
        <input
          type="text"
          required
          className="form-control"
          autoComplete="nope"
          value={this.state.nombreNuevaProvincia}
          onChange={this.onChangeNuevaProvincia}
        />
      </>
    ) : (
      <input
        type="text"
        disabled
        required
        autoComplete="nope"
        className="form-control"
        value={this.state.nombreProvinciaInferido}
      />
    );

    const listaOpcionesGrupos = this.state.listaGrupos.map((grupo) => {
      if (grupo.provincia !== this.state.CUM.substring(0, 3)) return <></>;

      return (
        <option key={grupo.provincia + grupo.numero} value={grupo.numero}>
          GPO {grupo.numero} - {grupo.nombre}
        </option>
      );
    });

    return (
      <div className={this.state.seccion}>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="/">
            <img src="/images/mi-agenda-label.svg" alt="home"></img>
          </a>
        </nav>

        <main id="registro-component">
          <form onSubmit={this.onSubmit}>
            {this.state.etapaRegistro === 0 && (
              <div id="edad-form" className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label>
                      <strong>Fecha de Nacimiento: </strong>
                    </label>
                    <div>
                      <DatePicker
                        selected={this.state.fechaNacimiento}
                        onChange={this.onChangeFechaNacimiento}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Sección scout: </strong>
                    </label>
                    {this.state.errorSeccionMissing && (
                      <div>
                        <small className="text-danger">
                          Es necesario seleccionar la sección a la que
                          perteneces.
                        </small>
                      </div>
                    )}
                    <div id="secciones-container" className="d-flex">
                      <img
                        className="btn-manada"
                        src="/images/icon-lobato.svg"
                        alt="icono lobato"
                        onClick={this.onSelectManada}
                      />
                      <img
                        className="btn-tropa"
                        src="/images/icon-scout.svg"
                        alt="icono scout"
                        onClick={this.onSelectTropa}
                      />
                      <img
                        className="btn-comunidad"
                        src="/images/icon-caminante.svg"
                        alt="icono caminante"
                        onClick={this.onSelectComunidad}
                      />
                      <img
                        className="btn-clan"
                        src="/images/icon-rover.svg"
                        alt="icono rover"
                        onClick={this.onSelectClan}
                      />
                    </div>
                    {this.state.seccion === seccionesNombreConjunto.MANADA && (
                      <div id="consentimiento-container" className="mt-1">
                        <small>
                          Se debe contar con un adulto responsable al momento de
                          llenar este registro. Favor de continuar una vez se
                          esté en compañía de aquel encargado del lobato scout.
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow-1"></div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onComenzarRegistro}
                  >
                    Comenzar registro
                  </button>
                </div>
              </div>
            )}
            {this.state.etapaRegistro === 1 && (
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
                      required
                      autoComplete="nope"
                      style={{ textTransform: "uppercase" }}
                      className="form-control"
                      value={this.state.CUM}
                      onChange={this.onChangeCUM}
                    />
                    <small className="text-danger">{this.state.errorCUM}</small>
                  </div>

                  <div className="form-group">
                    <label>Nombre: </label>
                    <input
                      type="text"
                      required
                      autoComplete="nope"
                      className="form-control"
                      value={this.state.nombre}
                      onChange={this.onChangeNombre}
                    />
                    <small className="text-danger">
                      {this.state.errorNombre}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Apellido(s): </label>
                    <input
                      type="text"
                      required
                      autoComplete="nope"
                      className="form-control"
                      value={this.state.apellido}
                      onChange={this.onChangeApellido}
                    />
                  </div>

                  <div className="form-group">
                    <label>Provincia: </label>
                    {inputNombreProvincia}
                  </div>

                  {(this.state.provincia ||
                    this.state.nombreNuevaProvincia) && (
                    <div className="form-group">
                      <label>Grupo: </label>
                      <select
                        name="grupo"
                        required
                        autoComplete="nope"
                        className="form-control"
                        value={this.state.grupo}
                        onChange={this.handleInputChange}
                      >
                        <option value="0" key="0" disabled>
                          Selecciona el grupo al cual perteneces
                        </option>
                        {listaOpcionesGrupos}
                        <option value="-1" key="-1">
                          Mi grupo no se encuentra en esta lista
                        </option>
                      </select>
                    </div>
                  )}

                  {this.state.grupo === -1 && (
                    <div className="form-group">
                      <label>Número y nombre de grupo: </label>
                      <div className="d-flex">
                        <input
                          name="numeroNuevoGrupo"
                          type="number"
                          required
                          autoComplete="nope"
                          className="form-control w-25"
                          value={this.state.numeroNuevoGrupo}
                          onChange={this.handleInputChange}
                        />
                        <input
                          name="nombreNuevoGrupo"
                          type="text"
                          required
                          autoComplete="nope"
                          className="form-control flex-grow-3"
                          value={this.state.nombreNuevoGrupo}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-grow-1"></div>

                  <input
                    type="submit"
                    value="Registrarme"
                    className="btn btn-primary mb-4"
                  />
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    );
  }
}
