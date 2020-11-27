const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');
const BillsController = require('./controllers/BillsController');

/* routes.get('/users', UserController.index); */
routes.post('/user', UserController.create);
routes.delete('/user/:id', UserController.remove);
routes.put('/profile/edit_name', ProfileController.editName);
routes.put('/profile/edit_email', ProfileController.editEmail);
routes.put('/profile/new_password', ProfileController.createNewPassword);
routes.post('/login', SessionController.login);

routes.post('/profile/new_bill', BillsController.create);

module.exports = routes;
