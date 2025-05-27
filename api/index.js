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
    const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/dados', (req, res) => {
    const dados = getDados();
    res.json(dados);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});