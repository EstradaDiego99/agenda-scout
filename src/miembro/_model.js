const { Schema, model } = require("mongoose");

/** Conjunto de variables relacionadas a un miembro del movimiento en la ASMAC */
const miembroSchema = new Schema(
  {
    /** Clave única de membresía. [Ej:BCS0820065] */
    CUM: {
      type: String,
      index: true,
      required: true,
      match: /[A-Z0-9]{3}[0-9]{7}/,
      unique: true,
    },

    /** Nombre inicial, puede ser uno o dos Strings. [Ej. Ángel Alexander] */
    nombre: { type: String, required: true },

    /** Apellido, puede ser uno o dos Strings. [Ej. Rivas Jimenez] */
    apellido: { type: String, required: true },

    /** Fecha de nacimiento del miembro (para calcular la edad) */
    fNacimiento: { type: Date, required: true },

    /** Fecha en la que el scout se registró inicialmente */
    fRegistro: { type: Date, required: false },

    /** Correo electrónico de contacto con el miembro */
    correo: { type: String, required: true, unique: true },

    /** Contraseña encriptada para inicio de sesión */
    contrasenia: { type: String, required: true },
  },
  {
    collection: "membresia",
    discriminatorKey: "tipoDeMiembro",
    strict: false,
  }
);

miembroSchema.loadClass(
  class {
    /** Nombre completo de un usuario formado por primer nombre y apellido */
    get nombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
    }

    /** Cantidad de años de edad del usuario */
    get aniosEdad() {
      var diff = (Date.now().getTime() - this.fechaNacimiento.getTime()) / 1000;
      diff /= 60 * 60 * 24;
      return Math.abs(Math.round(diff / 365.25));
    }

    /** Cuánto tiempo ha pertenecido un miembro en el movimiento */
    get aniosRegistro() {
      var diff = (Date.now().getTime() - this.fechaRegistro.getTime()) / 1000;
      diff /= 60 * 60 * 24;
      return Math.abs(Math.round(diff / 365.25));
    }
  }
);

/** Miembro registrado en el movimiento scout */
const Miembro = model("Miembro", miembroSchema);

module.exports = { Miembro, miembroSchema };
