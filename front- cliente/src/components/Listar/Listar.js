import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Listar() {
  return (
    <div>
      <h1>Listagem de Tarefas</h1>
      <Link to="/cadastrar">
        <Button variant="success" type="submit">
          Nova Tarefa
        </Button>
      </Link>
    </div>
  );
}

export default Listar;
