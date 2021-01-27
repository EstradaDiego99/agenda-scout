import axios from "axios";
import { backendURL } from "../../globals";
import { guardarSesion } from "../../_auth/utils";

/**
 * Autenticación de inicio de sesión
 * @param {String} correo Correo bajo el cual se iniciará sesión
 * @param {String} contrasenia Contraseña para autenticación
 */
async function iniciarSesion(correo, contrasenia) {
  const loginResponse = await axios.post(`${backendURL}/login/`, {
    correo,
    contrasenia,
  });
  if (loginResponse) {
    guardarSesion(loginResponse.data.token);
  }
  return loginResponse;
}

export { iniciarSesion };
