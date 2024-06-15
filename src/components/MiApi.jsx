import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import Buscador from "./Buscador";

function MiApi() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const url = "https://api.boostr.cl/feriados/en.json";

  useEffect(() => {
    consultaDeAPI();
  }, []);

  const consultaDeAPI = async () => {
    try {
      const response = await fetch(url);
      const info = await response.json();
      setInfo(info.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error);
      setLoading(false);
    }
  };

  console.log("INFO---->", info);
  console.info("tipo de dato=", typeof info);

  const filteredData = info.filter(
    (fechas) =>
      fechas.date.toLowerCase().includes(query.toLowerCase()) ||
      fechas.title.toLowerCase().includes(query.toLowerCase()) ||
      fechas.type.toLowerCase().includes(query.toLowerCase()) ||
      fechas.extra.toLowerCase().includes(query.toLowerCase())
  );
  // const sortedData = filteredData.sort((a, b) => a.uid.localeCompare(b.uid));
  const sortedData = filteredData.sort(function (a, b) {
    return a.date - b.date;
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <>
      <h1>Feriados de Chile</h1>
      <Container fluid className="container">
        <Row>
          <Col className="buscador">
            <Buscador query={query} setQuery={setQuery} />
          </Col>
        </Row>
        <Row>
          <Col className="listado">
            <Table responsive striped bordered className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Extra</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((feriado) => (
                  <tr key={feriado.date}>
                    <td>{feriado.date}</td>
                    <td>{feriado.title}</td>
                    <td>{feriado.type}</td>
                    <td>{feriado.extra}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MiApi;
