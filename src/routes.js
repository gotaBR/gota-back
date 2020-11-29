const express = require('express');

const routes = express.Router();

const pdf = require('html-pdf');
const pdfTemplate = require('./utils/template/index.js');

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
routes.get('/profile/bills', BillsController.index);
routes.put('/profile/update_bill', BillsController.update);
routes.delete('/profile/delete_bill', BillsController.delete);

routes.post('/create-pdf', (request, response) => {
  pdf.create(pdfTemplate(request.body)).toFile('result.pdf', (err) => {
    if (err) {
      response.send(Promise.reject());
    }

    response.send(Promise.resolve());
  });
});

module.exports = routes;
