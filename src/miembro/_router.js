const router = require("express").Router();
const { Miembro } = require("./_model");

// CREATE
router.route("/").post((req, res) => {
  const nuevoMiembro = new Miembro(req.body);
  nuevoMiembro
    .save()
    .then(() => res.json("Se ha registrado nuevo miembro!"))
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
router.get("/", (_, res) => {
  Miembro.find()
    .then((miembros) => res.json(miembros))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:CUM").get((req, res) => {
  Miembro.findOne({ CUM: req.params.CUM })
    .then((Miembro) => res.json(Miembro))
    .catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE
router.route("/:CUM").post((req, res) => {
  Miembro.findOneAndUpdate({ CUM: req.params.CUM }, req.body, {
    //options
    returnNewDocument: true,
    new: true,
    strict: false,
  })
    .then(() => res.json("Miembros ha sido actualizado!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.route("/:CUM").delete((req, res) => {
  Miembro.deleteOne({ CUM: req.params.CUM })
    .then(() => res.json("Miembro ha sido removido del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
