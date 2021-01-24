const { Schema, model } = require("mongoose");
const { Muchacho } = require("../miembro/models/muchacho");

const agrupacionSchema = new Schema(
  {
    /** Código de la provincia en la que la agrupación se encuentra registrada. [Ej. BCS] */
    provincia: { type: String, required: true, match: /[A-Z0-9]{3}/ },

    /** Número de grupo en la que la agrupación se encuentra registrada. [Ej. 5] */
    grupo: { type: Number, required: true },

    /** Nombre de la agrupación */
    nombre: { type: String, required: false },

    /** Miembros que forman la agrupación */
    miembros: [{ type: String, match: /[A-Z]{3}[0-9]{7}/ }],
  },
  {
    collection: "agrupaciones",
    discriminatorKey: "tipoAgrupacion",
  }
);
const Agrupacion = model("Agrupacion", agrupacionSchema);

const seisenaSchema = new Schema({});
seisenaSchema.virtual("seisenero").get(function () {
  return Muchacho.findOne({ CUM: this.miembros[0] });
});
/** Agrupación de lobatos dentro de una manada */
const Seisena = Agrupacion.discriminator("Seisena", seisenaSchema);

module.exports = { Seisena };
