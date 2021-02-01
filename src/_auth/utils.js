import axios from "axios";
import Cookies from "js-cookie";
import { backendURL } from "../globals";

/** Recibe un token almacenado en las cookies del navegador y regresa el CUM asociado */
async function autenticarToken() {
  const authResponse = await axios.post(`${backendURL}/authenticate/`, {
    token: Cookies.get("cum_token"),
  });
  const loggedCUM = authResponse.data.jwtVerification.CUM;
  const loggedMiembro = await axios.get(`${backendURL}/miembros/${loggedCUM}`);

  return loggedMiembro.data;
}

/** Guardar cookie para recordar la sesión en el dispositivo durante un año */
function guardarSesion(token) {
  Cookies.set("cum_token", token, { expires: 365 });
}

/** Remover las cookies del navegador para desconectar al usuario en el dispositivo */
function borrarSesion() {
  Cookies.remove("cum_token");
}

export { autenticarToken, guardarSesion, borrarSesion };
