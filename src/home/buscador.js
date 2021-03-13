import React, { useState, useEffect } from "react";
import { backendURL, stringsMatch } from "../globals";
import axios from "axios";

import MiembroResumen from "./miembro-resumen";

export default function BuscadorMiembros() {
  const [busqueda, setBusqueda] = useState("");
  const [listaMiembros, setListaMiembros] = useState([]);

  useEffect(() => {
    async function fetchMiembros() {
      const resMiembros = await axios
        .get(`${backendURL}/home/lista-miembros`)
        .catch((err) => err);
      if (resMiembros instanceof Error) {
        alert(resMiembros.response.data);
        return;
      }
      setListaMiembros(resMiembros.data);
    }
    fetchMiembros();
  }, []);

  const miembrosFiltrados = listaMiembros.filter((m) => {
    if (!busqueda.length) return false;
    return stringsMatch(m.CUM, busqueda) || stringsMatch(m.nombre, busqueda);
  });

  console.log(miembrosFiltrados);

  return (
    <section id="buscador-miembros" className="col-12 col-md-6 mt-4">
      <p className="mb-2 text-center">Buscar miembro scout por nombre o CUM:</p>

      <div className="form-group p-2">
        <div className="d-flex align-items-center with-icon">
          <i className="material-icons">search</i>
          <input
            type="text"
            autoComplete="nope"
            className="form-control buscador-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="lista-miembros">
          {miembrosFiltrados.map((m) => (
            <MiembroResumen miembro={m} key={m.CUM} />
          ))}
        </div>
      </div>
    </section>
  );
}
