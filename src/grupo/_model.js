const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema(
  {
    /** Código de la provincia a la que el grupo pertenece */
    provincia: {
      type: String,
      required: [true, "El codigo de provincia es un campo obligatorio."],
      match: /[A-Z0-9]{3}/,
    },

    /** Número de grupo */
    numero: {
      type: Number,
      required: [true, "El número de grupo es un campo obligatorio."],
    },

    /** Nombre del grupo */
    nombre: {
      type: String,
      required: [true, "El nombre de grupo es un campo obligatorio."],
    },
  },
  {
    collection: "grupos",
  }
);

schema.index({ provincia: 1, numero: 1 }, { unique: true });

schema.plugin(uniqueValidator, {
  message: "Ya existe un grupo registrado con este {PATH}.",
});

/** Agrupación de miembros dentro de una provincia scout */
const Grupo = model("Grupo", schema);

module.exports = Grupo;
