const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.get('/users', UserController.index);
routes.post('/user', UserController.create);
routes.delete('/user/:id', UserController.remove);
routes.post('/login', SessionController.login);

module.exports = routes;
