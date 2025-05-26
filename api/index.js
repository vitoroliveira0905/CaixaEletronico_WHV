const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000;

function getDados() {
    const dados = fs.readFileSync(path.join(__dirname, 'dados.json'), 'utf8');
    return JSON.parse(dados);
}

app.get('/api/dados', (req, res) => {
    const dados = getDados();
    res.json(dados);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});