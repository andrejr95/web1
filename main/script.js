const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

app.use(express.json());

// Rota para receber os dados do formulário
app.post("/cadastro", (req, res) => {
  const { fullname, email, username, password, role } = req.body;

  // Ler o arquivo usuarios.json (certifique-se de ter o arquivo existente)
  fs.readFile("usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao ler o arquivo de usuários.");
    }

    // Converter o conteúdo do arquivo para objeto JavaScript
    const usuarios = JSON.parse(data);

    // Verificar se o email ou username já estão cadastrados
    const usuarioExistente = usuarios.find(
      (usuario) => usuario.email === email || usuario.username === username
    );

    if (usuarioExistente) {
      return res.status(400).send("E-mail ou nome de usuário já cadastrados.");
    }

    // Adicionar os novos dados ao array de usuários
    usuarios.push({ fullname, email, username, password, role });

    // Converter o objeto JavaScript de volta para formato JSON
    const usuariosAtualizados = JSON.stringify(usuarios);

    // Salvar os dados no arquivo usuarios.json
    fs.writeFile("usuarios.json", usuariosAtualizados, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao salvar os dados de cadastro.");
      }

      return res.status(200).send("Cadastro realizado com sucesso.");
    });
  });
});

app.post("/disponibilizar", (req, res) => {
  const { materia, dia, mes, ano, hora, minuto, role, fullname,marcada } = req.body;

  // Ler o arquivo usuarios.json (certifique-se de ter o arquivo existente)
  fs.readFile("dados.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao ler o arquivo de usuários.");
    }

    // Converter o conteúdo do arquivo para objeto JavaScript
    const aulas = JSON.parse(data);

    // Verificar se o email ou username já estão cadastrados
    const aulaExistente = aulas.find(
      (aula) =>
        aula.materia === materia &&
        aula.dia === dia &&
        aula.mes === mes &&
        aula.ano === ano &&
        aula.hora === hora &&
        aula.minuto === minuto
    );

    if (aulaExistente) {
      return res.status(400).send("Aula já cadastrada.");
    }

    // Adicionar os novos dados ao array de usuários
    aulas.push({ materia, dia, mes, ano, hora, minuto, role, fullname });

    // Converter o objeto JavaScript de volta para formato JSON
    const aulasAtualizados = JSON.stringify(aulas);

    // Salvar os dados no arquivo dados.json
    fs.writeFile("dados.json", aulasAtualizados, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao salvar os dados de cadastro.");
      }

      return res.status(200).send("Cadastro realizado com sucesso.");
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Ler o arquivo usuarios.json (certifique-se de ter o arquivo existente)
  fs.readFile("usuarios.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao ler o arquivo de usuários.");
    }

    // Converter o conteúdo do arquivo para objeto JavaScript
    const usuarios = JSON.parse(data);

    // Verificar se o email ou username já estão cadastrados
    const usuarioExistente = usuarios.find(
      (usuario) =>
        usuario.password === password && usuario.username === username
    );

    console.log(usuarioExistente);

    if (!usuarioExistente) {
      return res.json({ erro: "Usuário ou senha incorretos" });
    }

    usuarioExistente.success = true;

    return res.json(usuarioExistente);
  });
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/aulas_disponibilizadas", (req, res) => {
  res.sendFile(__dirname + "/aulas_disponibilizadas.html");
});

app.get("/disponibilizar", (req, res) => {
  res.sendFile(__dirname + "/disponibilizar.html");
});
app.get("/main_professor", (req, res) => {
  res.sendFile(__dirname + "/main_professor.html");
});
app.get("/main_aluno", (req, res) => {
  res.sendFile(__dirname + "/main_aluno.html");
});
app.get("/marcar_aula", (req, res) => {
  res.sendFile(__dirname + "/marcar_aula.html");
});
app.use("/", express.static(path.resolve("./")));

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080.");
});
