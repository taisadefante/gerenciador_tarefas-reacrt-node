import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ItensListaTarefas from "./itens-lista-tarefas";
import Paginacao from "./paginacao";

function Listar() {
  const ITENS_POR_PAG = 6;

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOdenarAsc] = useState(false);
  const [ordenasDesc, setOrdenarDesc] = useState(false);

  useEffect(() => {
    function obterTarefas() {
      const tarefasDb = localStorage["tarefas"];
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      setTotalItens(listaTarefas.length);

      setTarefas(
        listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG)
      );
    }
    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, paginaAtual]);

  function handleMudarPagina(pagina) {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);
  }

  function handleOrdenar(event) {
    event.preventDefault();
  }

  return (
    <div className="text-center">
      <h1>Gerenciador de Tarefas</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa
              </a>
            </th>
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
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas}
          />
        </tbody>
      </Table>
      <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAG} // Certifique-se de que está correto
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
      />

      <footer>
        <span>
          Copyright © 2023 Tais Defante . Todos os direitos reservados.
        </span>
        <br />
        <span>Contato: taisadefante@hotmail.com</span>
      </footer>
    </div>
  );
}

export default Listar;
