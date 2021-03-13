import { secciones } from "../_utils/secciones";
import { useHistory } from "react-router-dom";

/**
 * Resumen de la información correspondiente a un miembro scout, entre lo que
 * nos encontramos con su CUM, su sección y su nombre
 */
export default function MiembroResumen({ miembro }) {
  const history = useHistory();
  const imgDefault = Object.values(
    secciones[miembro.seccion].imgDistintivos
  )[0];
  const imgDistintivo = miembro.cargo
    ? secciones[miembro.seccion].imgDistintivos[miembro.cargo]
    : imgDefault;

  return (
    <div
      className="miembro-resumen d-flex p-1 cursor-pointer"
      onClick={() => history.push(`/${miembro.CUM}`)}
    >
      <img
        src={imgDistintivo}
        alt={secciones[miembro.seccion]}
        className="distintivo"
      />
      <div className="ml-1">
        <p>{miembro.nombre}</p>
        <small>{miembro.CUM}</small>
      </div>
    </div>
  );
}
