const router = require("express").Router();
const Miembro = require("../miembro/_model");

// Conseguir lista de miembros para el form03-scout-info
router.get("/lista-miembros", async (_, res) => {
  const resLista = await Miembro.find({})
    .lean()
    .select("nombre nombreSelva apellido CUM seccion -_id")
    .catch((err) => err);
  if (resLista instanceof Error)
    return res.status(400).json("Hubo un error al leer lista de miembros");
  const jsonLista = resLista.map((m) => {
    const nomDisplay =
      m.seccion === "manada" ? m.nombreSelva : `${m.nombre} ${m.apellido}`;
    return {
      CUM: m.CUM,
      nombre: nomDisplay,
      seccion: m.seccion,
    };
  });
  return res.json(jsonLista);
});

module.exports = router;
