const progresionManada = {
  fechaOtorgado: Date,
};

const especialidadManada = {
  fechaOtorgado: Date,
};

const especialidadNivelesManada = {
  amarillo: especialidadManada,
  verde: especialidadManada,
  azul: especialidadManada,
  rojo: especialidadManada,
};

const vidaAlAireLibreManada = {
  fechaOtorgado: Date,
};

const desarrolloSustentableManada = {
  fechaOtorgado: Date,
};

const historialManada = {
  nombreSelva: String,

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
};

module.exports.historialManada = historialManada;
