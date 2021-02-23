import InsigniasManada from "./01_manada";
import InsigniasTropa from "./02_tropa";
import InsigniasComunidad from "./03_comunidad";
import InsigniasClan from "./04_clan";

import { seccionesENUM } from "../../../_utils/secciones";
const { MANADA, TROPA, COMUNIDAD, CLAN } = seccionesENUM;

export default function Insignias({ selfProfile, CUM, seccion, historial }) {
  let component = <></>;
  switch (seccion) {
    case MANADA:
      component = (
        <InsigniasManada
          selfProfile={selfProfile}
          CUM={CUM}
          historial={historial[MANADA] || {}}
        />
      );
      break;
    case TROPA:
      component = (
        <InsigniasTropa
          selfProfile={selfProfile}
          CUM={CUM}
          historial={historial[TROPA] || {}}
        />
      );
      break;
    case COMUNIDAD:
      component = (
        <InsigniasComunidad
          selfProfile={selfProfile}
          CUM={CUM}
          historial={historial[COMUNIDAD] || {}}
        />
      );
      break;
    case CLAN:
      component = (
        <InsigniasClan
          selfProfile={selfProfile}
          CUM={CUM}
          historial={historial[CLAN] || {}}
        />
      );
      break;
    default:
      break;
  }

  return component;
}
