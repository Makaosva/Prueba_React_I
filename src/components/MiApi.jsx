import React, { useEffect, useState } from "react";

function MiApi() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    consultaDeAPI();
  }, []);

  const consultaDeAPI = async () => {
    const url = "https://www.swapi.tech/api/people/";
    const response = await fetch(url);
    const data = await response.json();
    console.log("DATA---->", data);

    setInfo(`${data.result[3].name}`);
  };

  return (
    <div>
      <p>{info}</p>
      <p>Hola</p>
    </div>
  );
}

export default MiApi;
