const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Miembro } = require("../_model");

router.post("/", async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ msg: "Campos incompletos." });
  }
  let miembro = await Miembro.findOne({ correo: correo }).exec();
  if (!miembro) {
    miembro = await Miembro.findOne({ CUM: correo }).exec();
  }
  if (!miembro)
    return res.status(400).json({
      msg: "No hay miembro registrado con este CUM o correo.",
      cause: "correo",
    });

  const contraseniaMatch = await bcrypt.compare(
    contrasenia,
    miembro.contrasenia
  );
  if (!contraseniaMatch)
    return res
      .status(400)
      .json({ msg: "Contraseña incorrecta.", cause: "contrasenia" });

  const token = jwt.sign({ CUM: miembro.CUM }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
  res.json({
    token,
    miembro: {
      CUM: miembro.CUM,
    },
  });
});

module.exports = router;
