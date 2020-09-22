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

/** Géneros que la aplicación soporta para referirse a sus usuarios */
const listaGeneros = {
  NEUTRO: "N",
  FEMENINO: "F",
  MASCULINO: "M",
};

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com"
    : "http://localhost:5000";

module.exports = {
  seccionesNombreCompleto,
  seccionesNombreConjunto,
  seccionesNombreIndividuo,
  listaGeneros,
  backendURL,
};
