import distManada from "../_img/01_manada/distintivo-amarillo.svg";
import distSubseisenero from "../_img/01_manada/distintivo-subseisenero-amarillo.svg";
import distSeisenero from "../_img/01_manada/distintivo-seisenero-amarillo.svg";
import distTropa from "../_img/02_tropa/distintivo_scout.svg";
import distSubguia from "../_img/02_tropa/distintivo_subguia.svg";
import distGuia from "../_img/02_tropa/distintivo_guia.svg";
import distComunidad from "../_img/03_comunidad/distintivo_01-caminante.svg";
import distSubcoordinador from "../_img/03_comunidad/distintivo_02-subcoordinador.svg";
import distCoordinador from "../_img/03_comunidad/distintivo_03-coordinador.svg";
import distClan from "../_img/04_clan/distintivo-seccion_rover.svg";
import distPromotor from "../_img/04_clan/distintivo-seccion_promotor-rover.svg";

/** Etapas correspondientes a cada sección dentro del programa de formación de jóvenes scouts */
const secciones = {
  default: {
    indice: 0,
    individuo: "",
    conjunto: "",
    compIndividuo: "",
    compConjunto: "",
    imgDistintivos: {},
  },
  manada: {
    indice: 1,
    individuo: "lobato",
    conjunto: "manada",
    compIndividuo: "Lobato Scout",
    compConjunto: "Manada de Lobatos",
    imgDistintivos: {
      lobato: distManada,
      subseisenero: distSubseisenero,
      seisenero: distSeisenero,
    },
  },
  tropa: {
    indice: 2,
    individuo: "scout",
    conjunto: "tropa",
    compIndividuo: "Tropero Scout",
    compConjunto: "Tropa de Scouts",
    imgDistintivos: {
      scout: distTropa,
      subguia: distSubguia,
      guia: distGuia,
    },
  },
  comunidad: {
    indice: 3,
    individuo: "caminante",
    conjunto: "comunidad",
    compIndividuo: "Caminante Scout",
    compConjunto: "Comunidad de Caminantes",
    imgDistintivos: {
      caminante: distComunidad,
      subcoordinador: distSubcoordinador,
      coordinador: distCoordinador,
    },
  },
  clan: {
    indice: 4,
    individuo: "rover",
    conjunto: "clan",
    compIndividuo: "Rover Scout",
    compConjunto: "Clan de Rovers",
    imgDistintivos: {
      rover: distClan,
      promotor: distPromotor,
    },
  },
};

/** ENUM correspondiente al nombre de las secciones */
const seccionesENUM = {
  MANADA: "manada",
  TROPA: "tropa",
  COMUNIDAD: "comunidad",
  CLAN: "clan",
};

export { secciones, seccionesENUM };
