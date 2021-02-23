const { Schema } = require("mongoose");
const Miembro = require("../_model");

const scouterSchema = new Schema(
  {
    fechaInicio: { type: Date },
    historialSecciones: {},
  },
  {
    collection: "scouters",
  }
);

/** Joven inscrito en el movimiento. Lobato, Scout, Caminante, Rover */
const Scouter = Miembro.discriminator("Scouter", scouterSchema);

module.exports = { Scouter };
