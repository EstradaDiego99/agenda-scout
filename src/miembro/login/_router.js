const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Miembro } = require("../_model");

require("dotenv").config();

router.route("/").post(async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    // validate
    if (!correo || !contrasenia) {
      return res.status(400).json({ msg: "Campos incompletos." });
    }

    let miembro = await Miembro.findOne({ correo: correo });
    if (!miembro) {
      miembro = await Miembro.findOne({ CUM: correo });
    }
    if (!miembro)
      return res.status(400).json({
        msg: "No hay miembro registrado con este CUM o correo.",
        errorCause: "Correo",
      });

    const contraseniaMatch = await bcrypt.compare(
      contrasenia,
      miembro.contrasenia
    );
    if (!contraseniaMatch)
      return res
        .status(400)
        .json({ msg: "Contraseña incorrecta.", errorCause: "Contraseña" });

    const token = jwt.sign({ CUM: miembro.CUM }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });
    res.json({
      token,
      miembro: {
        CUM: miembro.CUM,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
