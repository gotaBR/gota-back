const express = require('express');

// Inicializando o app utilizando o express;

const app = express();

// Adicionar ao app a utilização do express.json();

app.use(express.json());

const port = 8000

// Definindo método GET HTTP

app.get('/', (req, res) => {
    res.send('<title>GOTA<title>')
})

// Escutando com o app na porta 8000
app.listen(port, () => {
        console.log('App listening at http://localhost:8000');
})
