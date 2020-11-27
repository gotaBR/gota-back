const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
  async login(request, response) {
    const { email, senha } = request.body;

    let user;
    try {
      [user] = await connection('usuarios').where('email', email).select('*');
      if (user.lenght === 0) {
        return response.status(404).send('Usuário não encontrado.');
      }
    } catch (error) {
      return response.status(400).send(error.message);
    }

    return bcrypt.compare(senha, user.senha, (error, same) => {
      if (same) {
        const { id, name } = user;
        return response.status(200).send({
          id, email, name, message: 'Usuário logado',
        });
      }

      return response.status(401).send({ error, message: 'Senha errada' });
    });
  },
};
