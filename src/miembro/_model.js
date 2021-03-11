const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema(
  {
    /** Clave única de membresía. [Ej:BCS0820065] */
    CUM: {
      type: String,
      index: true,
      required: [true, "El CUM es un campo obligatorio."],
      match: [
        /^[A-Z0-9]{3}[0-9]{7}$/,
        "CUM debe cumplir con el formato correcto. Es un código de 10 caracteres, los últimos 7 de ellos todos números.",
      ],
      unique: true,
      uniqueCaseInsensitive: true,
    },

    /** Nombre inicial, puede ser uno o dos Strings. [Ej. Ángel Alexander] */
    nombre: {
      type: String,
      required: [true, "El nombre es un campo obligatorio."],
    },

    /** Apellido, puede ser uno o dos Strings. [Ej. Rivas Jimenez] */
    apellido: {
      type: String,
      required: [true, "El apellido es un campo obligatorio."],
    },

    /** Fecha de nacimiento del miembro (para calcular la edad) */
    fNacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es un campo obligatorio."],
    },

    /** Fecha en la que el scout se registró inicialmente */
    fRegistro: { type: Date, required: false },

    /** Sección en la que el miembro se encuentra registrado */
    seccion: {
      type: String,
      required: [true, "La sección es un campo obligatorio."],
      enum: {
        values: ["manada", "tropa", "comunidad", "clan"],
        message:
          "Esta sección no está permitida o no está escrita con el formato correcto.",
      },
    },

    /** Nombre de selva utilizado en la manada. [Ej. Pukina] */
    nombreSelva: {
      type: String,
      required: [
        function () {
          return this.seccion === "manada";
        },
        "El nombre de selva es un campo obligatorio para todo miembro de la manada de lobatos.",
      ],
    },

    /** Correo electrónico de contacto con el miembro */
    correo: {
      type: String,
      required: [true, "El correo electrónico es un campo obligatorio."],
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "El correo debe ser una dirección válida.",
      ],
      unique: true,
      uniqueCaseInsensitive: true,
    },

    /** Contraseña encriptada para inicio de sesión */
    contrasenia: {
      type: String,
      required: [true, "La contraseña es un campo obligatorio."],
    },
  },
  {
    collection: "membresia",
    discriminatorKey: "tipoDeMiembro",
    strict: false,
  }
);

schema.plugin(uniqueValidator, {
  message: "Ya existe otro miembro registrado con este {PATH}.",
});

/** Miembro registrado en el movimiento scout */
const Miembro = model("Miembro", schema);

module.exports = Miembro;
