const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Miembro = require("../_model");

router.post("/", async (req, res) => {
  const { correo, contrasenia } = req.body;

  const errors = {};
  if (!correo) {
    errors.errCorreo = "Introduce tu CUM o el correo con el que te registraste";
  }
  if (!contrasenia) {
    errors.errContrasenia = "Introduce tu contraseña";
  }
  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  const miembro =
    (await Miembro.findOne({ correo: correo }).exec()) ||
    (await Miembro.findOne({ CUM: correo }).exec());
  if (!miembro) {
    errors.errCorreo = "No hay miembro registrado con este CUM o correo";
    return res.status(400).json(errors);
  }

  if (!bcrypt.compareSync(contrasenia, miembro.contrasenia)) {
    errors.errContrasenia = "Contraseña incorrecta";
    return res.status(400).json(errors);
  }

  const token = jwt.sign({ CUM: miembro.CUM }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
  res.json({ token, miembro: { CUM: miembro.CUM } });
});

module.exports = router;
