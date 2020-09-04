const { Schema } = require("mongoose");
const { Provincia } = require("./provincia.model");
const { Grupo } = require("./grupo.model");
const { Miembro } = require("./miembro.model");

const muchachoSchema = new Schema(
  {
    /** Código de la provincia en la que el muchacho se encuentra registrado. [Ej. BCS] */
    provincia: { type: String, required: true, match: /[A-Z0-9]{3}/ },

    /** Número de grupo en el que el muchacho se encuentra registrado. [Ej. 5] */
    grupo: { type: Number, required: true },

    /** Toda la información relacionada al programa educativo de jóvenes */
    historialEducativo: {},

    seccion: String,
  },
  {
    collection: "muchachos",
    discriminatorKey: "seccion",
  }
);

muchachoSchema.virtual("grupoModel").get(function () {
  return Grupo.findOne({
    provincia: this.provincia,
    numero: this.grupo,
  }).exec();
});

muchachoSchema.virtual("provinciaModel").get(function () {
  return Provincia.findOne({
    codigo: this.provincia,
  }).exec();
});

/** Joven inscrito en el movimiento. Lobato, Scout, Caminante, Rover */
const Muchacho = Miembro.discriminator("Muchacho", muchachoSchema);

module.exports = { Muchacho, muchachoSchema };
