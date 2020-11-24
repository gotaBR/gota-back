const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
require('dotenv').config();

// Inicializando o app utilizando o express;

const app = express();

app.use(cors());
// Adicionar ao app a utilização do express.json();

app.use(express.json());

// Definindo método GET HTTP

app.use(routes);

// Escutando com o app na porta 8000

app.listen(process.env.PORT || 8000);
