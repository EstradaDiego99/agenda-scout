const { Schema, model } = require("mongoose");

const seccionSchema = Schema(
  {
    /** Provincia a la que pertenece la sección */
    provincia: { type: String, required: true, match: /[A-Z0-9]{3}/ },

    /** Grupo scout al que pertenece la sección */
    grupo: { type: Number, required: true },

    /** Etapa a la que la sección se dedica */
    etapa: String,

    /** Nombre de la sección */
    nombre: { type: String },

    /** Lista del CUM de los scouters que dirigen la sección */
    scouters: [
      {
        type: String,
        index: true,
        required: true,
        match: /[A-Z]{3}[0-9]{7}/,
        unique: true,
      },
    ],

    /** Fecha en la que la sección se fundó */
    fechaFundacion: { type: Date },
  },
  { collection: "secciones", discriminatorKey: "etapa" }
);

/** Conjunto de jóvenes y scouters integrados a un grupo scout */
const Seccion = model("Seccion", seccionSchema);

module.exports = { Seccion };
