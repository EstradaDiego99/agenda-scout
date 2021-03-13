/** URL para conexión con backend */
const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://agenda-scout.herokuapp.com/api"
    : "http://localhost:5000/api";

/** ¿Es el segundo un substring del primero?
 * @param {String} outer
 * @param {String} inner
 * @returns {boolean}
 */
const stringsMatch = (outer, inner) => {
  outer = outer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  inner = inner
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return outer.indexOf(inner) !== -1;
};

export { backendURL, stringsMatch };
