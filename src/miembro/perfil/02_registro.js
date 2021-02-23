import { seccionesENUM } from "../../_utils/secciones";
const { MANADA } = seccionesENUM;

export default function Registro({
  seccion,
  CUM,
  nombre,
  apellido,
  grupo,
  provincia,
}) {
  return (
    <section className="d-flex pt-2 pb-2 mb-4">
      <div className="d-flex justify-content-around flex-column w-25">
        <p className="cinta-provincia m-0">{provincia}</p>
        <div className="logo-grupo"></div>
        <p className="cinta-grupo">{grupo}</p>
      </div>
      <div className="d-flex flex-column justify-content-around pr-3 pl-3 flex-grow-1">
        <div>
          {seccion !== MANADA && (
            <p className="mb-2">{`${nombre} ${apellido}`}</p>
          )}
          <p className="font-weight-bold">{CUM}</p>
        </div>
      </div>
    </section>
  );
}
