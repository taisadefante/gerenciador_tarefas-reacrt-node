const { uuid } = require("uuidv4");

let tarefas = [
  { id: "1", nome: "Aprender React", concluida: true },
  { id: "2", nome: "Aprender Node", concluida: false },
  { id: "3", nome: "Aprender Python", concluida: false },
  { id: "4", nome: "Aprender JavaScript", concluida: true },
];

function listarTarefaId(req, res) {
  const id = req.params.id;
  const tarefa = tarefas.filter((tarefa) => tarefa.id === id);
  if (tarefa.length === 0) {
    res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  res.json(tarefa[0]);
}

function listarTarefas(req, res) {
  const pagina = req.query["pag"] || 1;
  const ordem = req.query["ordem"];
  const filtroTarefa = req.query["filtro-tarefa"];
  const itensPorPagina = req.query["itens-por-pagina"] || 3;
  let tarefasRetornar = tarefas.slice(0);
  //filtro
  if (filtroTarefa) {
    tarefasRetornar = tarefasRetornar.filter(
      (t) => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
    );
  }

  //ordenar
  if (ordem === "ASC") {
    tarefasRetornar.sort((t1, t2) =>
      t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
    );
  } else if (ordem === "desc") {
    tarefasRetornar.sort((t1, t2) =>
      t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
    );
  }
  // retornar

  res.json({
    totalItens: tarefasRetornar.length,
    tarefas: tarefasRetornar
      .slice(0)
      .splice((pagina - 1) * itensPorPagina, itensPorPagina),
    pagina: pagina,
  });
}

function CadastrarTarefa(req, res) {
  if (!req.body["nome"] && !req.body["concluida"]) {
    res.status(400).json({ erro: "Requisição invalida." });
  }
  const tarefa = {
    id: uuid(),
    nome: req.body["nome"],
    concluida: req.body["concluida"],
  };
  tarefas.push(tarefa);
  res.json(tarefa);
}

function atualizarTarefa(req, res) {
  if (!req.body["nome"] && !req.body["concluida"]) {
    res.status(400).json({ erro: "Requisição invalida" });
  }
  const id = req.params.id;
  let tarefaAtualizada = false;

  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      tarefa.nome = req.body["nome"];
      tarefa.concluida = req.body["concluida"];
      tarefaAtualizada = true;
    }
    return tarefa;
  });
  if (!tarefaAtualizada) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json({
    id: id,
    nome: req.body["nome"],
    concluida: req.body["concluida"],
  });
}

function removerTarefa(req, res) {
  const id = req.params.id;
  const numTarefas = tarefas.length;
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  if (numTarefas === tarefas.legth) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json({ msg: "Tarefa removida com sucesso" });
}

function concluirTarefa(req, res) {
  const id = req.params.id;
  let tarefaConcluida = false;
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      tarefa.concluida = true;
      tarefaConcluida = true;
    }
    return tarefa;
  });
  if (!tarefaConcluida) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json({ msg: "Tarefa concluida com sucesso" });
}

module.exports = {
  listarTarefaId,
  listarTarefas,
  CadastrarTarefa,
  atualizarTarefa,
  removerTarefa,
  concluirTarefa,
};
