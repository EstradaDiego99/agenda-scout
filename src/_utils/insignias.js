// PROGRESIONES
import progresionesManada_01 from "../_img/01_manada/progresion_01-pata-tierna.svg";
import progresionesManada_02 from "../_img/01_manada/progresion_02-saltador.svg";
import progresionesManada_03 from "../_img/01_manada/progresion_03-rastreador.svg";
import progresionesManada_04 from "../_img/01_manada/progresion_04-cazador.svg";
import progresionesTropa_01 from "../_img/02_tropa/progresion_01-pistas.svg";
import progresionesTropa_02 from "../_img/02_tropa/progresion_02-senda.svg";
import progresionesTropa_03 from "../_img/02_tropa/progresion_03-rumbo.svg";
import progresionesTropa_04 from "../_img/02_tropa/progresion_04-travesia.svg";
import progresionesComunidad_01 from "../_img/03_comunidad/progresiones_01-busqueda.svg";
import progresionesComunidad_02 from "../_img/03_comunidad/progresiones_02-encuentro.svg";
import progresionesComunidad_03 from "../_img/03_comunidad/progresiones_03-desafio.svg";
import progresionesClan_01 from "../_img/04_clan/horquilla_amarilla.svg";
import progresionesClan_02 from "../_img/04_clan/horquilla_verde.svg";
import progresionesClan_03 from "../_img/04_clan/horquilla_azul.svg";
import progresionesClan_04 from "../_img/04_clan/horquilla_roja.svg";

// ESPECIALIDADES
import deportes_01 from "../_img/especialidades/deportes-amarillo.svg";
import deportes_02 from "../_img/especialidades/deportes-verde.svg";
import deportes_03 from "../_img/especialidades/deportes-azul.svg";
import deportes_04 from "../_img/especialidades/deportes-rojo.svg";
import ecologia_01 from "../_img/especialidades/ecologia-amarillo.svg";
import ecologia_02 from "../_img/especialidades/ecologia-verde.svg";
import ecologia_03 from "../_img/especialidades/ecologia-azul.svg";
import ecologia_04 from "../_img/especialidades/ecologia-rojo.svg";
import expresionComunicacion_01 from "../_img/especialidades/expresion-y-comunicacion-amarillo.svg";
import expresionComunicacion_02 from "../_img/especialidades/expresion-y-comunicacion-verde.svg";
import expresionComunicacion_03 from "../_img/especialidades/expresion-y-comunicacion-azul.svg";
import expresionComunicacion_04 from "../_img/especialidades/expresion-y-comunicacion-rojo.svg";
import humanidades_01 from "../_img/especialidades/humanidades-amarillo.svg";
import humanidades_02 from "../_img/especialidades/humanidades-verde.svg";
import humanidades_03 from "../_img/especialidades/humanidades-azul.svg";
import humanidades_04 from "../_img/especialidades/humanidades-rojo.svg";
import seguridadRescate_01 from "../_img/especialidades/seguridad-y-rescate-amarillo.svg";
import seguridadRescate_02 from "../_img/especialidades/seguridad-y-rescate-verde.svg";
import seguridadRescate_03 from "../_img/especialidades/seguridad-y-rescate-azul.svg";
import seguridadRescate_04 from "../_img/especialidades/seguridad-y-rescate-rojo.svg";
import tecnologiaCiencia_01 from "../_img/especialidades/tecnologia-y-ciencia-amarillo.svg";
import tecnologiaCiencia_02 from "../_img/especialidades/tecnologia-y-ciencia-verde.svg";
import tecnologiaCiencia_03 from "../_img/especialidades/tecnologia-y-ciencia-azul.svg";
import tecnologiaCiencia_04 from "../_img/especialidades/tecnologia-y-ciencia-rojo.svg";

// VIDA AL AIRE LIBRE
import ival_01 from "../_img/especialidades/ival-amarillo.svg";
import ival_02 from "../_img/especialidades/ival-verde.svg";
import ival_03 from "../_img/especialidades/ival-azul.svg";
import ival_04 from "../_img/especialidades/ival-rojo.svg";

// DESARROLLO SUSTENTABLE
import idsManada_ambiente from "../_img/01_manada/ids_01-seeonee.svg";
import idsManada_desarrollo from "../_img/01_manada/ids_02-waingunga.svg";
import idsManada_paz from "../_img/01_manada/ids_03-khanhiwara.svg";
import idsTropa_ambiente from "../_img/02_tropa/ids_01-brownsea.svg";
import idsTropa_desarrollo from "../_img/02_tropa/ids_02-mafeking.svg";
import idsTropa_paz from "../_img/02_tropa/ids_03-paxtu.svg";
import idsComunidad_desarrollo from "../_img/03_comunidad/IDS_desarrollo-comunitario.svg";
import idsComunidad_ambiente from "../_img/03_comunidad/IDS_medio-ambiente.svg";
import idsComunidad_paz from "../_img/03_comunidad/IDS_paz.svg";

// ISMMA
import ismma_manada from "../_img/ismma_manada.svg";
import ismma_tropa from "../_img/ismma_tropa.svg";
import ismma_ramaMayor from "../_img/ismma_rama-mayor.svg";

// MENSAJEROS DE LA PAZ
import scoutsDelMundo from "../_img/insignia-scouts-del-mundo.svg";

// MENSAJEROS DE LA PAZ
import mensajerosPaz from "../_img/mensajeros-de-la-paz.svg";

/** Progresiones de cada sección, crecimiento del individuo */
const progresiones = {
  manada: [
    progresionesManada_01,
    progresionesManada_02,
    progresionesManada_03,
    progresionesManada_04,
  ],
  tropa: [
    progresionesTropa_01,
    progresionesTropa_02,
    progresionesTropa_03,
    progresionesTropa_04,
  ],
  comunidad: [
    progresionesComunidad_01,
    progresionesComunidad_02,
    progresionesComunidad_03,
  ],
  clan: [
    progresionesClan_01,
    progresionesClan_02,
    progresionesClan_03,
    progresionesClan_04,
  ],
};

/** Especialidades/Competencias a utilizar en manada, tropa y comunidad */
const especialidades = {
  deportes: [deportes_01, deportes_02, deportes_03, deportes_04],
  ecologia: [ecologia_01, ecologia_02, ecologia_03, ecologia_04],
  expresion: [
    expresionComunicacion_01,
    expresionComunicacion_02,
    expresionComunicacion_03,
    expresionComunicacion_04,
  ],
  humanidades: [humanidades_01, humanidades_02, humanidades_03, humanidades_04],
  seguridad: [
    seguridadRescate_01,
    seguridadRescate_02,
    seguridadRescate_03,
    seguridadRescate_04,
  ],
  tecnologia: [
    tecnologiaCiencia_01,
    tecnologiaCiencia_02,
    tecnologiaCiencia_03,
    tecnologiaCiencia_04,
  ],
};

/** Competencias de la sección del Clan de Rovers */
const hombreVitruvio = [
  humanidades_01,
  humanidades_02,
  humanidades_03,
  humanidades_04,
];

/** Arreglo de Insignias de Vida al Aire Libre en diferentes niveles */
const vidaAlAireLibre = [ival_01, ival_02, ival_03, ival_04];

/** Mapa de Insignias de Desarrollo Sustentable a lo largo de las secciones */
const IDSs = {
  manada: {
    ambiente: {
      nombre: "Seeonee",
      img: idsManada_ambiente,
    },
    desarrollo: {
      nombre: "Khanhiwara",
      img: idsManada_desarrollo,
    },
    paz: {
      nombre: "Waingunga",
      img: idsManada_paz,
    },
  },
  tropa: {
    ambiente: {
      nombre: "Brownsea",
      img: idsTropa_ambiente,
    },
    desarrollo: {
      nombre: "Mafeking",
      img: idsTropa_desarrollo,
    },
    paz: {
      nombre: "Paxtu",
      img: idsTropa_paz,
    },
  },
  comunidad: {
    ambiente: {
      nombre: "Medio Ambiente",
      img: idsComunidad_ambiente,
    },
    desarrollo: {
      nombre: "Desarrollo Comunitario",
      img: idsComunidad_desarrollo,
    },
    paz: {
      nombre: "Paz",
      img: idsComunidad_paz,
    },
  },
};

/** Insignia Scout Mundial del Medio Ambiente a lo largo de las secciones */
const ISMMA = {
  manada: ismma_manada,
  tropa: ismma_tropa,
  comunidad: ismma_ramaMayor,
  clan: ismma_ramaMayor,
  ramaMayor: ismma_ramaMayor,
};

export {
  progresiones,
  especialidades,
  hombreVitruvio,
  vidaAlAireLibre,
  IDSs,
  ISMMA,
  scoutsDelMundo,
  mensajerosPaz,
};
