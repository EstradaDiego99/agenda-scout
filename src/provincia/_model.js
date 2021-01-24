const { Schema, model } = require("mongoose");

const provinciaSchema = new Schema(
  {
    /** Código de la provincia en la que el muchacho se encuentra registrado. [Ej. BCS] */
    codigo: {
      type: String,
      required: true,
      unique: true,
      match: /[A-Z0-9]{3}/,
    },

    /** Nombre completo de la provincia. [Ej. Baja California Sur] */
    nombre: { type: String, required: true, unique: true },
  },
  {
    collection: "provincias",
  }
);
provinciaSchema.index({ codigo: 1 }, { unique: true });

/** Conjunto de grupos cercanos geográficamente. [Ej. Baja California Sur] */
const Provincia = model("Provincia", provinciaSchema);

module.exports = { Provincia };
