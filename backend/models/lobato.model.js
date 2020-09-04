const { Schema } = require("mongoose");
const { Seisena } = require("./agrupacion.model");
const { Manada } = require("./manada.model");
const { Muchacho } = require("./muchacho.model");

const progresionManada = {
  fechaRecibido: Date,
};

const especialidadManada = {
  fechaRecibido: Date,
};

const especialidadNivelesManada = {
  amarillo: especialidadManada,
  verde: especialidadManada,
  azul: especialidadManada,
  rojo: especialidadManada,
};

const vidaAlAireLibreManada = {
  fechaRecibido: Date,
};

const desarrolloSustentableManada = {
  fechaRecibido: Date,
};

const insigniaSeccion = {
  fechaRecibido: Date,
};

const insigniaDesarrolloOptimo = {
  fechaRecibido: Date,
};

const sendaDeEnlace = {
  fechaRecibido: Date,
};

const lobatoSchema = new Schema({
  seisena: String,

  historialEducativo: {
    lobato: {
      fechaIngreso: Date,
      nombreDeSelva: String,

      progresiones: {
        loboPataTierna: progresionManada,
        loboSaltador: progresionManada,
        loboRastreador: progresionManada,
        loboCazador: progresionManada,
      },

      especialidades: {
        deportes: especialidadNivelesManada,
        ecologia: especialidadNivelesManada,
        expresionYComunicacion: especialidadNivelesManada,
        humanidades: especialidadNivelesManada,
        seguridadYRescate: especialidadNivelesManada,
        tecnologiaYCiencia: especialidadNivelesManada,
      },

      vidaAlAireLibre: {
        minimosTecnicos: vidaAlAireLibreManada,
        unaDestreza: vidaAlAireLibreManada,
        dosDestrezas: vidaAlAireLibreManada,
        tresDestrezas: vidaAlAireLibreManada,
      },

      desarrolloSustentable: {
        medioAmbiente: desarrolloSustentableManada,
        desarrolloComunitario: desarrolloSustentableManada,
        paz: desarrolloSustentableManada,
      },

      insigniaSeccion: insigniaSeccion,

      insigniaDesarrolloOptimo: insigniaDesarrolloOptimo,

      sendaDeEnlace: sendaDeEnlace,
    },
  },
});

lobatoSchema.virtual("manadaModel").get(function () {
  return Manada.findOne({
    provincia: this.provincia,
    grupo: this.grupo,
  });
});

lobatoSchema.virtual("seisenaModel").get(function () {
  return Seisena.findOne({
    provincia: this.provincia,
    grupo: this.grupo,
    nombre: this.seisena,
  });
});

lobatoSchema.virtual("cargo").get(function () {
  Seisena.findOne({
    provincia: this.provincia,
    grupo: this.grupo,
    nombre: this.seisena,
  })
    .then((seisena) => {
      return seisena.miembros.indexOf(this.CUM);
    })
    .catch((err) => {
      return err;
    });
});

const Lobato = Muchacho.discriminator("Lobato", lobatoSchema);

module.exports = { Lobato };
