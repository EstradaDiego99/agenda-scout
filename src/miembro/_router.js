const router = require("express").Router();
const flatten = require("flat");
const Miembro = require("./_model");

// CREATE
router.post("/", (req, res) => {
  const nuevoMiembro = new Miembro(req.body);
  nuevoMiembro
    .save()
    .then(() => res.json("Se ha registrado nuevo miembro!"))
    .catch((err) => {
      const errors = {};
      for (const [key, obj] of Object.entries(err.errors || {})) {
        errors[key] = obj.properties.message;
      }
      res.status(400).json(errors);
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
  Miembro.updateOne({ CUM: req.params.CUM }, flatten(req.body), {
    //options
    returnNewDocument: true,
    new: true,
    strict: false,
  })
    .then(() => res.json("Miembro ha sido actualizado!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.route("/:CUM").delete((req, res) => {
  Miembro.deleteOne({ CUM: req.params.CUM })
    .then(() => res.json("Miembro ha sido removido del sistema."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
