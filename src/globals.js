/** Etapas correspondientes a cada sección dentro del programa de formación de jóvenes scouts */
const seccionesNombreCompleto = {
  DEFAULT: "",
  MANADA: "Manada de Lobatos",
  TROPA: "Tropa de Scouts",
  COMUNIDAD: "Comunidad de Caminantes",
  CLAN: "Clan de Rovers",
};

/** Strings del nombre correspondiente a cada sección dentro del programa de formación de jóvenes scouts */
const seccionesNombreConjunto = {
  DEFAULT: "",
  MANADA: "manada",
  TROPA: "tropa",
  COMUNIDAD: "comunidad",
  CLAN: "clan",
};

/** Strings del nombre correspondiente a cada sección dentro del programa de formación de jóvenes scouts */
const seccionesNombreIndividuo = {
  DEFAULT: "",
  MANADA: "lobato",
  TROPA: "scout",
  COMUNIDAD: "caminante",
  CLAN: "rover",
};

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

export {
  seccionesNombreCompleto,
  seccionesNombreConjunto,
  seccionesNombreIndividuo,
  backendURL,
};
