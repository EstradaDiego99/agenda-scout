const router = require("express").Router();
const { Muchacho } = require("../models/muchacho.model");

// CREATE
router.route("/").post((req, res) => {
  const nuevoMuchacho = new Muchacho(req.body);
  nuevoMuchacho
    .save()
    .then(() => res.json("Se ha registrado nuevo muchacho!"))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({
          errorMesage: `Error: ${err}`,
          repeatedKey: Object.keys(err.keyValue)[0],
        });
      } else {
        res.status(400).json(`Error: ${err}`);
      }
    });
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
