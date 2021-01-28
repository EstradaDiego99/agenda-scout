/** Etapas correspondientes a cada sección dentro del programa de formación de jóvenes scouts */
const secciones = {
  completo: {
    DEFAULT: "",
    MANADA: "Manada de Lobatos",
    TROPA: "Tropa de Scouts",
    COMUNIDAD: "Comunidad de Caminantes",
    CLAN: "Clan de Rovers",
  },
  conjunto: {
    DEFAULT: "",
    MANADA: "manada",
    TROPA: "tropa",
    COMUNIDAD: "comunidad",
    CLAN: "clan",
  },
  individuo: {
    DEFAULT: "",
    MANADA: "lobato",
    TROPA: "scout",
    COMUNIDAD: "caminante",
    CLAN: "rover",
  },
};

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

export { secciones, backendURL };
