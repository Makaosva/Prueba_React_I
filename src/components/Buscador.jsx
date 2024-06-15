import { Form } from "react-bootstrap";

function Buscador({ query, setQuery }) {
  return (
    <Form.Control
      type="text"
      placeholder="Filtrar Feriados"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Buscador;
