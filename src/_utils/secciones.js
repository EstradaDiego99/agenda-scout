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

import iconMSeccion from "../_img/01_manada/insignia-final_seccion.svg";
import iconTSeccion from "../_img/02_tropa/insignia-final_seccion.svg";
import iconCSeccion from "../_img/03_comunidad/insignia-final_seccion.svg";
import iconRSeccion from "../_img/04_clan/insignia-final_seccion.svg";
import iconMIDO from "../_img/01_manada/insignia-final_desarrollo-optimo.svg";
import iconTIDO from "../_img/02_tropa/insignia-final_desarrollo-optimo.svg";
import iconCIDO from "../_img/03_comunidad/insignia-final_desarrollo-optimo.svg";
import iconRIDO from "../_img/04_clan/insignia-final_terminal.svg";

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
    imgInsigniaSeccion: iconMSeccion,
    imgIDO: iconMIDO,
  },
  tropa: {
    indice: 2,
    individuo: "scout",
    conjunto: "tropa",
    compIndividuo: "Troperx Scout",
    compConjunto: "Tropa de Scouts",
    imgDistintivos: {
      scout: distTropa,
      subguia: distSubguia,
      guia: distGuia,
    },
    imgInsigniaSeccion: iconTSeccion,
    imgIDO: iconTIDO,
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
    imgInsigniaSeccion: iconCSeccion,
    imgIDO: iconCIDO,
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
    imgInsigniaSeccion: iconRSeccion,
    imgIDO: iconRIDO,
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
