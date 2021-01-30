/** Etapas correspondientes a cada sección dentro del programa de formación de jóvenes scouts */
const secciones = {
  default: {
    indice: 0,
    individuo: "",
    conjunto: "",
    compIndividuo: "",
    compConjunto: "",
  },
  manada: {
    indice: 0,
    individuo: "lobato",
    conjunto: "manada",
    compIndividuo: "Lobato Scout",
    compConjunto: "Manada de Lobatos",
  },
  tropa: {
    indice: 0,
    individuo: "scout",
    conjunto: "tropa",
    compIndividuo: "Tropero Scout",
    compConjunto: "Tropa de Scouts",
  },
  comunidad: {
    indice: 0,
    individuo: "caminante",
    conjunto: "comunidad",
    compIndividuo: "Caminante Scout",
    compConjunto: "Comunidad de Caminantes",
  },
  clan: {
    indice: 0,
    individuo: "rover",
    conjunto: "clan",
    compIndividuo: "Rover Scout",
    compConjunto: "Clan de Rovers",
  },
};

/** ENUM correspondiente al nombre interno de las secciones en la base de datos */
const seccionesENUM = {
  MANADA: "manada",
  TROPA: "tropa",
  COMUNIDAD: "comunidad",
  CLAN: "clan",
};

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

export { secciones, seccionesENUM, backendURL };
