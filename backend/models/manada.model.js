const { Schema } = require("mongoose");
const { Seccion } = require("./seccion.model");

const manadaSchema = new Schema({});
manadaSchema.loadClass(
  class {
    /** Jefe de manada */
    get akela() {
      return this.scouters[0];
    }
  }
);

/** Sección perteneciente a la etapa de la manada de lobatos */
const Manada = Seccion.discriminator("Manada", manadaSchema);

module.exports = { Manada };
