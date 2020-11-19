const express = require('express');

// Inicializando o app utilizando o express;
const app = express();

// Adicionar ao app a utilização do express.json();

app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello Wolrd.')
})

app.listen(3333, () => console.log("Listening on localhost:3333."));

