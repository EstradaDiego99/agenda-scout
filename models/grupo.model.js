const { Schema, model } = require("mongoose");

const grupoSchema = new Schema(
  {
    provincia: {
      type: String,
      required: true,
      match: /[A-Z0-9]{3}/,
    },

    numero: { type: Number, required: true },

    nombre: { type: String, required: true },
  },
  {
    collection: "grupos",
  }
);

grupoSchema.index({ provincia: 1, numero: 1 }, { unique: true });

/** Agrupación de miembros dentro de una provincia scout */
const Grupo = model("Grupo", grupoSchema);

module.exports = { Grupo };
