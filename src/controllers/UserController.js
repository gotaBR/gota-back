const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {

  async create(request, response) {
    const { name, email, senha } = request.body;

    try {
      const emailExists = await connection('usuarios').where('email', email).select('email').first();

      if (emailExists) {
        return response.status(400).send('Este email ja esta em uso!');
      }

      const encryptedPassword = await bcrypt.hash(senha, 10);

      await connection('usuarios').insert({
        name,
        email,
        senha: encryptedPassword,
      });

      return response.status(201).send('Usuário criado com sucesso!');
    } catch (error) {
      return response.status(400).send(error);
    }
  },

  async index(request, response) {
    try {
      const users = await connection('usuarios').select('*');
      return response.send({ users });
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};
