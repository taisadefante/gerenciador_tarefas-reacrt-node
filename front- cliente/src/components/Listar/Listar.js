import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Listar() {
  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);

  useEffect(() => {
    function obterTarefas() {
      const tarefasDb = localStorage["tarefas"];
      let listarTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      setTarefas(listarTarefas);
    }
    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas]);

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>
              <Link to="/cadastrar">
                <Button className="btn btn-success btn-sm" type="submit">
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; Nova Tarefa
                </Button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}

export default Listar;
