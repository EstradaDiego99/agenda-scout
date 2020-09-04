const router = require("express").Router();
const { Muchacho } = require("../models/muchacho.model");
const { Provincia } = require("../models/provincia.model");
const { Grupo } = require("../models/grupo.model");

// CREATE
router.route("/").post((req, res) => {
  const CUM = req.body.CUM;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const fechaNacimiento = Date.parse(req.body.fechaNacimiento);
  const provincia = req.body.provincia;
  const grupo = req.body.grupo;
  const seccion = req.body.seccion;

  const nombreNuevaProvincia = req.body.nombreNuevaProvincia;
  const numeroNuevoGrupo = req.body.numeroNuevoGrupo;
  const nombreNuevoGrupo = req.body.nombreNuevoGrupo;

  const nuevoMuchacho = new Muchacho({
    CUM,
    nombre,
    apellido,
    fechaNacimiento,
    provincia,
    grupo,
    seccion,
  });

  if (nombreNuevaProvincia) {
    const nuevaProvincia = new Provincia({
      codigo: CUM.substring(0, 3),
      nombre: nombreNuevaProvincia,
    });
    nuevaProvincia
      .save()
      .then(() => res.write("Se ha registrado nueva provincia."))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  if (nombreNuevoGrupo) {
    const nuevoGrupo = new Grupo({
      provincia: provincia || CUM.substring(0, 3),
      numero: numeroNuevoGrupo,
      nombre: nombreNuevoGrupo,
    });
    nuevoGrupo
      .save()
      .then(() => res.write("Se ha registrado nuevo grupo."))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  /*
  if (nombreNuevaSeccion) {
    const nuevaSeccion = new Seccion({
      provincia: provincia || CUM.substring(0, 3),
      numero: grupo || numeroNuevoGrupo,
      nombre: nombreNuevaSeccion,
      etapa: seccion,
    });
    nuevaSeccion
      .save()
      .then(() => res.write("Se ha registrado nueva seccion."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
  */

  nuevoMuchacho
    .save()
    .then(() => res.json("Se ha registrado nuevo muchacho!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// READ
router.route("/").get((req, res) => {
  Muchacho.find()
    .then((muchachos) => res.json(muchachos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:CUM").get((req, res) => {
  Muchacho.findOne({ CUM: req.params.CUM })
    .then((muchacho) => res.json(muchacho))
    .catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE
router.route("/:CUM").post((req, res) => {
  console.log(req.body);
  Muchacho.findOneAndUpdate({ CUM: req.params.CUM }, req.body, {
    //options
    returnNewDocument: true,
    new: true,
    strict: false,
  })
    .then(() => res.json("Muchachos ha sido actualizado!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
// (Esto es bastante peligroso, se mantiene para uso exclusivo de desarrollo)
router.route("/").delete((req, res) => {
  Muchacho.deleteMany({})
    .then(() => res.json("Muchachos han sido removidos del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:CUM").delete((req, res) => {
  Muchacho.deleteOne({ CUM: req.params.CUM })
    .then(() => res.json("Muchacho ha sido removido del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
