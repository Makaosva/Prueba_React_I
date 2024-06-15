import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Buscador from "./Buscador";

function MiApi() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const url1 = "https://www.swapi.tech/api/people";
  const url2 = "https://www.swapi.tech/api/planets";
  const url3 = "https://www.swapi.tech/api/starships";

  useEffect(() => {
    consultaDeAPI();
  }, []);

  const consultaDeAPI = async () => {
    try {
      const response = await fetch(url1);
      const info = await response.json();
      setInfo(info.results);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error);
      setLoading(false);
    }
  };

  console.log("INFO---->", info);
  console.info("tipo de dato=", typeof info);

  const filteredData = info.filter((people) =>
    people.name.toLowerCase().includes(query.toLowerCase())
  );
  // const sortedData = filteredData.sort((a, b) => a.uid.localeCompare(b.uid));
  const sortedData = filteredData.sort(function (a, b) {
    return a.uid - b.uid;
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <>
      <h1>Lista de Personajes Star Wars</h1>
      <Container fluid className="container">
        <Row>
          <Col className="buscador">
            <Buscador query={query} setQuery={setQuery} />
          </Col>
        </Row>
        <Row>
          <Col md={5} sm={12} className="listado">
            <Table responsive striped bordered className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Ver Detalle</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((personaje) => (
                  <tr key={personaje.uid}>
                    <td>{personaje.uid}</td>
                    <td>{personaje.name}</td>
                    <td>
                      <Button>Detalle</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={7} sm={12}>
            <p>Detalle Prsonaje</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MiApi;
