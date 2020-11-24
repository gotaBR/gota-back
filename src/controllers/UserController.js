const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {

  async create(request, response) {
    const { name, email, senha } = request.body;

    try {
      const emailExists = await connection('usuarios').where('email', email).select('email').first();

      if (emailExists) {
        return response.status(401).json({ message: 'Este email ja esta em uso!' });
      }
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = await bcrypt.hash(senha, salt);

      await connection('usuarios').insert({
        name,
        email,
        senha: encryptedPassword,
      });

      return response.status(201).send('Usuário criado com sucesso!');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  },

  async remove(request, response) {
    /* const auth = request.headers.authorization; */
    const id = request.params;

    try {
      const user = await connection('usuarios').where(id, id).delete();

      if (!user) {
        return response.status(400).send('Usuário não encontrado.');
      }
    } catch (error) {
      return response.status(400).send(error);
    }

    return response.status(201).send('Usuário deletado');
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
