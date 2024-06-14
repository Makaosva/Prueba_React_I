import React from "react";

function Buscador({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Buscar Personaje"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Buscador;
