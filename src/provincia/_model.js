const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema(
  {
    /** Código de la provincia en la que el muchacho se encuentra registrado. [Ej. BCS] */
    codigo: {
      type: String,
      required: [true, "El código de provincia es un campo obligatorio."],
      unique: true,
      index: true,
      match: [
        /^[A-Z0-9]{3}$/,
        "El código de la provincia debe ser una cadena de tres caracteres alfanuméricos.",
      ],
    },

    /** Nombre completo de la provincia. [Ej. Baja California Sur] */
    nombre: {
      type: String,
      required: [true, "El nombre de provincia es un campo obligatorio."],
      unique: true,
    },
  },
  {
    collection: "provincias",
  }
);

schema.plugin(uniqueValidator, {
  message: "Ya existe una provincia registrada con este <{PATH}>.",
});

/** Conjunto de grupos cercanos geográficamente. [Ej. Baja California Sur] */
const Provincia = model("Provincia", schema);

module.exports = Provincia;
