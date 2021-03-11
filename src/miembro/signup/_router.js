const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Miembro = require("../_model");
const Provincia = require("../../provincia/_model");
const Grupo = require("../../grupo/_model");

// Registrar miembro
router.post("/", async (req, res) => {
  const data = req.body || {};
  const returnErrors = {};
  let errMsg = "";

  // Registrar nueva provincia
  const { provincia, nuevaProvincia } = data;
  delete data.nuevaProvincia;
  let currProvincia = provincia;
  if (provincia === "NULL") {
    currProvincia = nuevaProvincia.codigo;
    const resProvincia = await new Provincia(nuevaProvincia)
      .save()
      .catch((err) => err);
    if (resProvincia instanceof Error) {
      returnErrors.nuevaProvincia = {};
      errMsg += "Hubo un error registrando una nueva provincia. ";
      for (const [key, errValue] of Object.entries(resProvincia.errors))
        returnErrors.nuevaProvincia[key] = errValue.properties.message;
    }
  }

  // Registrar nuevo grupo
  const { grupo, nuevoGrupo } = data;
  delete data.nuevoGrupo;
  let currGrupo = grupo;
  if (grupo === -1) {
    currGrupo = nuevoGrupo.numero;
    nuevoGrupo.provincia = currProvincia;
    const resGrupo = await new Grupo(nuevoGrupo).save().catch((err) => err);
    if (resGrupo instanceof Error) {
      returnErrors.nuevoGrupo = {};
      errMsg += "Hubo un error registrando un nuevo grupo. ";
      for (const [key, errValue] of Object.entries(resGrupo.errors))
        returnErrors.nuevoGrupo[key] = errValue.properties.message;
    }
  }

  // Registrar nuevo miembro
  const nuevoMiembro = data;
  nuevoMiembro.provincia = currProvincia;
  nuevoMiembro.grupo = currGrupo;
  if (data.contrasenia)
    nuevoMiembro.contrasenia = bcrypt.hashSync(data.contrasenia, 10);
  const newMiembro = new Miembro(nuevoMiembro);
  const resMiembro = await newMiembro.save().catch((err) => err);
  if (resMiembro instanceof Error) {
    errMsg += "Hubo un error registrando un nuevo miembro. ";
    for (const [key, errValue] of Object.entries(resMiembro.errors))
      returnErrors[key] = errValue.properties.message;
  }

  if (Object.keys(returnErrors).length)
    return res.status(400).json({ msg: errMsg, errors: returnErrors });

  return res.json("Se ha registrado nuevo miembro!");
});

// Validación de form01-edad
router.post("/validate-form01", async (req, res) => {
  const data = req.body || {};
  const doc = new Miembro(data);
  const { errors = {} } = (await doc.validate().catch((err) => err)) || {};

  const returnErrors = {};
  if (errors.fNacimiento)
    returnErrors.fNacimiento = errors.fNacimiento.properties.message;
  if (errors.seccion) returnErrors.seccion = errors.seccion.properties.message;

  if (Object.keys(returnErrors).length)
    return res.status(400).json(returnErrors);

  return res.json("Todo bien!!");
});

// Validación de form02-personal-info
router.post("/validate-form02", async (req, res) => {
  const data = req.body || {};
  const doc = new Miembro(data);
  const { errors = {} } = (await doc.validate().catch((err) => err)) || {};

  const returnErrors = {};
  if (errors.nombre) returnErrors.nombre = errors.nombre.properties.message;
  if (errors.apellido)
    returnErrors.apellido = errors.apellido.properties.message;
  if (errors.nombreSelva)
    returnErrors.nombreSelva = errors.nombreSelva.properties.message;

  if (Object.keys(returnErrors).length)
    return res.status(400).json(returnErrors);

  return res.json("Todo bien!!");
});

// Conseguir lista de miembros para el form03-scout-info
router.get("/lista-provincias-grupos", async (_, res) => {
  const resLista = await Promise.all([
    Provincia.find({}).lean(),
    Grupo.find({}).lean(),
  ]).catch((err) => err);
  if (resLista instanceof Error)
    return res.status(400).json("Hubo un error al leer información");

  const [provincias, grupos] = resLista;
  provincias.sort((a, b) => (a.codigo > b.codigo ? 1 : 0));
  grupos.sort((a, b) => (a.numero > b.numero ? 1 : 0));
  return res.json({ provincias, grupos });
});

// Validación de miembro form03-scout-info
router.post("/validate-form03-miembro", async (req, res) => {
  const data = req.body || {};
  const doc = new Miembro(data);
  const { errors = {} } = (await doc.validate().catch((err) => err)) || {};

  const returnErrors = {};
  if (errors.CUM) returnErrors.CUM = errors.CUM.properties.message;

  if (Object.keys(returnErrors).length)
    return res.status(400).json(returnErrors);

  return res.json("Todo bien!!");
});

// Validación de provincias para el form03-scout-info
router.post("/validate-form03-provincia", async (req, res) => {
  const { provincia, nuevaProvincia } = req.body || {};

  if (!provincia)
    return res
      .status(400)
      .json(
        "Es necesario seleccionar una provincia de la lista o introducir una nueva provincia."
      );

  // Si nos dicen que la provincia ya existe, comprobarlo
  if (provincia !== "NULL") {
    const exists = await Provincia.exists({ codigo: provincia }).catch(
      (err) => err
    );
    if (exists instanceof Error)
      return res.status(400).json("Hubo un error al validar.");
    if (!exists)
      return res
        .status(400)
        .json(
          "Esta provincia no existe. Favor de introducir una nueva provincia."
        );
  }
  // Si no existe y vamos a crear una nueva, validar que se pueda
  else {
    const doc = new Provincia(nuevaProvincia);
    const { errors = {} } = (await doc.validate().catch((err) => err)) || {};
    const messages = Object.values(errors).map((err) => err.properties.message);
    const errMessage = messages.join(" ");
    if (errMessage) return res.status(400).json(errMessage);
  }

  return res.json("Todo bien!!");
});

// Validación de grupos para el form03-scout-info
router.post("/validate-form03-grupo", async (req, res) => {
  const { provincia, grupo, nuevoGrupo } = req.body || {};

  if (!provincia)
    return res
      .status(400)
      .json(
        "Es necesario seleccionar o crear la provincia para indicar grupo."
      );

  if (!grupo)
    return res
      .status(400)
      .json(
        "Es necesario seleccionar un grupo de la lista o introducir un nuevo grupo."
      );

  // Si nos dicen que el grupo ya existe, comprobarlo
  if (grupo > 0) {
    const exists = await Grupo.exists({ provincia, numero: grupo }).catch(
      (err) => err
    );
    if (exists instanceof Error)
      return res.status(400).json("Hubo un error al validar.");
    if (!exists)
      return res
        .status(400)
        .json("Este grupo no existe. Favor de introducir un nuevo grupo.");
  }
  // Si no existe y vamos a crear uno nuevo, validar que se pueda
  else {
    const doc = new Grupo(nuevoGrupo);
    const { errors = {} } = (await doc.validate().catch((err) => err)) || {};
    const messages = Object.values(errors).map((err) => err.properties.message);
    const errMessage = messages.join(" ");
    if (errMessage) return res.status(400).json(errMessage);
  }

  return res.json("Todo bien!!");
});

// Validación de correo electrónico y contraseñas
router.post("/validate-form04", async (req, res) => {
  const { correo, contrasenia, contraseniaVerif } = req.body || {};
  const returnErrors = {};

  const { errors = {} } =
    (await new Miembro({ correo }).validate().catch((err) => err)) || {};

  if (errors.correo) returnErrors.correo = errors.correo.properties.message;
  if (contrasenia.length < 8)
    returnErrors.contrasenia = "La contrasenia debe tener mínimo 8 caracteres.";
  else if (contrasenia !== contraseniaVerif)
    returnErrors.contrasenia = "Las contraseñas deben coincidir.";

  if (Object.keys(returnErrors).length)
    return res.status(400).json(returnErrors);

  return res.json("Todo bien!!");
});

module.exports = router;
