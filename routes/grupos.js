const router = require("express").Router();
const { Grupo } = require("../models/grupo.model");

// CREATE
router.route("/").post((req, res) => {
  const nuevoGrupo = new Grupo(req.body);
  nuevoGrupo
    .save()
    .then(() => res.json("Se ha registrado nuevo grupo."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// READ
router.route("/").get((req, res) => {
  Grupo.find()
    .then((grupos) => res.json(grupos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:provincia/:numero").get((req, res) => {
  Grupo.findOne({ provincia: req.params.provincia, numero: req.params.numero })
    .then((grupo) => res.json(grupo))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
// (Esto es bastante peligroso, se mantiene para uso exclusivo de desarrollo)
router.route("/").delete((req, res) => {
  Grupo.deleteMany({})
    .then(() => res.json("Grupos han sido removidos del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
