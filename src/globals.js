/** Etapas correspondientes a cada sección dentro del programa de formación de jóvenes scouts */
const secciones = {
  MANADA: "manada",
  TROPA: "tropa",
  COMUNIDAD: "comunidad",
  CLAN: "clan",
  default: {
    indice: 0,
    individuo: "",
    conjunto: "",
    compIndividuo: "",
    compConjunto: "",
  },
  manada: {
    indice: 1,
    individuo: "lobato",
    conjunto: "manada",
    compIndividuo: "Lobato Scout",
    compConjunto: "Manada de Lobatos",
  },
  tropa: {
    indice: 2,
    individuo: "scout",
    conjunto: "tropa",
    compIndividuo: "Tropero Scout",
    compConjunto: "Tropa de Scouts",
  },
  comunidad: {
    indice: 3,
    individuo: "caminante",
    conjunto: "comunidad",
    compIndividuo: "Caminante Scout",
    compConjunto: "Comunidad de Caminantes",
  },
  clan: {
    indice: 4,
    individuo: "rover",
    conjunto: "clan",
    compIndividuo: "Rover Scout",
    compConjunto: "Clan de Rovers",
  },
};

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

export { secciones, backendURL };
