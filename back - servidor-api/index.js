const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  listarTarefaId,
  listarTarefas,
  CadastrarTarefa,
  atualizarTarefa,
  removerTarefa,
  concluirTarefa,
} = require("./controllers/gerenciador-tarefas");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

//get, post, put, delete

//function nãoImplementado(req, res) {
// res.status(501).json({ erro: "Não implementado" });
//}

//listar todas as tarefas - get
app.get("/gerenciador-tarefas", listarTarefas);

// listar uma tarefa por id - get
app.get("/gerenciador-tarefas/:id", listarTarefaId);

// cadastrar uma tarefa - post
app.post("/gerenciador-tarefas", CadastrarTarefa);

// atualizar uma tarefa - put
app.put("/gerenciador-tarefas/:id", atualizarTarefa);

// remover uma tarefa - delete
app.delete("/gerenciador-tarefas/:id", removerTarefa);

// concluir uma tarefa / put
app.put("/gerenciador-tarefas/:id/concluir", concluirTarefa);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
