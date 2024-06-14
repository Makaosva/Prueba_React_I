import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";

function MiApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const url = "https://www.swapi.tech/api/people";

  useEffect(() => {
    consultaDeAPI();
  }, []);

  const consultaDeAPI = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.results);
      setLoading(false);
      console.log("DATA---->", data);
    } catch (error) {
      console.error(error.message);
      setError(error);
      setLoading(false);
    }
  };

  const filteredData = data.filter((people) =>
    people.name.toLowerCase().includes(query.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div>
      <h2>Lista de Personajes de Star</h2>
      <Buscador query={query} setQuery={setQuery} />
      <ul>
        {sortedData.map((personaje) => (
          <li key={personaje.name}>
            <a href={personaje.url}>{personaje.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MiApi;
