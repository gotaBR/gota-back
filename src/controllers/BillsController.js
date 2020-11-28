const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const id = request.headers.authorization;
    const {
      data, valor, consumo, empresa, categoria, status, regiao, municipio,
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
        regiao,
        municipio,
      });

      response.status(201).send('Conta salva com sucesso.');
    } catch (error) {
      response.status(400).send(error.message);
    }
  },

  async index(request, response) {
    const id = request.headers.authorization;

    try {
      const data = await connection('contas').where('user_id', id).select('*');
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  },
};
