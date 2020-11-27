const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const id = request.headers.authorization;
    const {
      data, valor, consumo, empresa, categoria, status,
    } = request.body;

    try {
      await connection('contas').where('user_id', id).insert({
        user_id: id,
        data,
        consumo,
        valor,
        empresa,
        categoria,
        status,
      });

      response.status(201).send('Conta salva com sucesso.');
    } catch (error) {
      response.status(400).send(error.message);
    }
  },
};
