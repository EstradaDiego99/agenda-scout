import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { borrarSesion } from "../_auth/utils";
import logo from "../logo.svg";
import "./_style.css";

/**
 * Componente para colocar en la parte superior de cada ventana
 * @component
 * @param {Object} props Propiedades dadas al header
 * @param {String} props.logoLink Enlace a donde se irá si se oprime el logo
 * @param {String} props.showBack Mostrar o no el botón de ir hacia atrás
 * @param {Boolean} props.showLogout Mostrar o no el botón de cerrar sesión
 * @param {String} props.userToShow Usuario hacia dónde redirigir
 */
export default function Header({
  logoLink = undefined,
  showBack = false,
  showLogout = false,
  userToShow = undefined,
}) {
  const history = useHistory();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        {logoLink && (
          <Link to={logoLink} className="navbar-brand">
            <img src={logo} alt="logo"></img>
          </Link>
        )}

        {showBack && (
          <button className="back-button" onClick={() => history.goBack()}>
            <i className="material-icons">arrow_back</i>
          </button>
        )}

        {showLogout && (
          <Link
            to="/login"
            onClick={() => {
              history.push("/");
              borrarSesion();
            }}
          >
            <i className="material-icons">exit_to_app</i>
          </Link>
        )}

        {userToShow && (
          <Link to={`/${userToShow}`}>
            <i className="material-icons">person</i>
          </Link>
        )}
      </nav>
    </header>
  );
}
