const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get('/users', UserController.index);
routes.post('/user', UserController.create);
routes.delete('/user/:id', UserController.remove);
module.exports = routes;
