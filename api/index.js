const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000;

function getDados() {
    const dados = fs.readFileSync(path.join(__dirname, 'dados.json'), 'utf8');
    return JSON.parse(dados);
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.put('/api/usuario/:id', (req, res) => {
    const id = req.params.id;
    const novosDados = req.body;
    const dados = getDados();

    if (!dados[id]) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    dados[id] = { ...dados[id], ...novosDados };

    fs.writeFileSync(path.join(__dirname, 'dados.json'), JSON.stringify(dados, null, 2));
    res.json({ sucesso: true, usuario: dados[id] });
});

app.get('/api/dados', (req, res) => {
    const dados = getDados();
    res.json(dados);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});