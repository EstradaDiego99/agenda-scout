const router = require("express").Router();
const { Provincia } = require("./_model");

// CREATE
router.route("/").post((req, res) => {
  const nuevaProvincia = new Provincia(req.body);
  nuevaProvincia
    .save()
    .then(() => res.json("Se ha registrado nueva provincia."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// READ
router.route("/").get((req, res) => {
  Provincia.find()
    .then((provincias) => res.json(provincias))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:codigo").get((req, res) => {
  Provincia.findOne({
    codigo: req.params.codigo,
  })
    .then((provincia) => res.json(provincia))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
// (Esto es bastante peligroso, se mantiene para uso exclusivo de desarrollo)
router.route("/").delete((req, res) => {
  Provincia.deleteMany({})
    .then(() => res.json("Provincias han sido removidos del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
