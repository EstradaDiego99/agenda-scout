const { Schema } = require("mongoose");
const { Muchacho } = require("./muchacho");

const progresionTropa = {
  fechaRecibido: Date,
};

const especialidadTropa = {
  fechaRecibido: Date,
};

const especialidadNivelesTropa = {
  amarillo: especialidadTropa,
  verde: especialidadTropa,
  azul: especialidadTropa,
  rojo: especialidadTropa,
};

const vidaAlAireLibreTropa = {
  fechaRecibido: Date,
};

const desarrolloSustentableTropa = {
  fechaRecibido: Date,
};

const insigniaSeccion = {
  fechaRecibido: Date,
};

const insigniaDesarrolloOptimo = {
  fechaRecibido: Date,
};

const lobatoSchema = new Schema({
  lobato: {
    nombreDeSelva: String,

    patrulla: { type: Schema.Types.ObjectId, ref: "Patrulla" },

    progresiones: {
      pista: progresionTropa,
      senda: progresionTropa,
      rumbo: progresionTropa,
      travesia: progresionTropa,
    },

    especialidades: {
      deportes: especialidadNivelesTropa,
      ecologia: especialidadNivelesTropa,
      expresionYComunicacion: especialidadNivelesTropa,
      humanidades: especialidadNivelesTropa,
      seguridadYRescate: especialidadNivelesTropa,
      tecnologiaYCiencia: especialidadNivelesTropa,
    },

    vidaAlAireLibre: {
      minimosTecnicos: vidaAlAireLibreTropa,
      unaDestreza: vidaAlAireLibreTropa,
      dosDestrezas: vidaAlAireLibreTropa,
      tresDestrezas: vidaAlAireLibreTropa,
    },

    desarrolloSustentable: {
      medioAmbiente: desarrolloSustentableTropa,
      desarrolloComunitario: desarrolloSustentableTropa,
      paz: desarrolloSustentableTropa,
    },

    insigniaSeccion: insigniaSeccion,

    insigniaDesarrolloOptimo: insigniaDesarrolloOptimo,
  },
});

/** Joven inscrito en el movimiento. 11 - 14 años */
const Scout = Muchacho.discriminator("Scout", lobatoSchema);

module.exports = { Scout };
