const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {

  async editName(request, response) {
    const id = request.headers.authorization;
    const { newName } = request.body;

    try {
      await connection('usuarios').where('id', id).update({ name: newName });
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }

    return response.status(200).send({ message: 'Nome alterado com sucesso', id, newName });
  },

  async editEmail(request, response) {
    const id = request.headers.authorization;
    const { newEmail } = request.body;

    try {
      const emailExists = await connection('usuarios').where('email', newEmail).select('email').first();

      if (emailExists) {
        return response.status(409).send('Este email ja esta em uso!');
      }

      await connection('usuarios').where('id', id).update({ email: newEmail });
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }

    return response.status(200).send({ message: 'Email alterado com sucesso', id, newEmail });
  },

  async createNewPassword(request, response) {
    const id = request.headers.authorization;
    const { newPassword, oldPassword } = request.body;

    if (newPassword === oldPassword) {
      return response.status(401).send('Esta senha é igual a senha anterior!');
    }

    try {
      const [user] = await connection('usuarios').where('id', id).select('*');
      const currentPassword = user.senha;

      if (!user) {
        return response.status(404).send('Usuário não encontrado!');
      }

      if (bcrypt.compareSync(oldPassword, currentPassword)) {
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await connection('usuarios').where('id', id).update({ senha: encryptedPassword });
        return response.status(201).send('Senha alterada com sucesso!');
      }
      return response.status(401).json({ error: 'Senha incorreta!' });
    } catch (error) {
      return response.status(400).send(error);
    }
  },

};
