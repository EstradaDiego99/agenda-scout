import { Link } from "react-router-dom";
import { borrarSesion } from "../_auth/utils";
import logo from "../mi-agenda-label.svg";
import "./_style.css";

/**
 * Componente para colocar en la parte superior de cada ventana
 * @component
 * @param {Object} props Propiedades dadas al header
 * @param {String} props.logoLink Enlace a donde se irá si se oprime el logo
 * @param {Boolean} props.showLogout Mostrar o no el botón de cerrar sesión
 */
export default function Header({ logoLink = "/", showLogout = false }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link to={logoLink} className="navbar-brand">
          <img src={logo} alt="logo"></img>
        </Link>

        {showLogout && (
          <Link to="/login" onClick={borrarSesion}>
            <i className="input-group-text material-icons logout">
              exit_to_app
            </i>
          </Link>
        )}
      </nav>
    </header>
  );
}
