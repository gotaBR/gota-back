const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
    
    async editName(request,response){
    
    const id = request.headers.authorization;
    const {newName} = request.body;

    try{
      await connection('usuarios').where('id', id).update({name: newName});
    }
    catch(error){
      console.log(error);
      return response.status(400).send(error);
    }

    return response.status(200).send({"message":"Nome alterado com sucesso", id, newName});
  },

  async editEmail(request,response){
    
    const id = request.headers.authorization;
    const {newEmail} = request.body;

    try{
      const emailExists = await connection('usuarios').where('email', newEmail).select('email').first();

      if (emailExists) {
        return response.status(409).send('Este email ja esta em uso!');
      }

      await connection('usuarios').where('id', id).update({email: newEmail});
    }
    catch(error){
      console.log(error);
      return response.status(400).send(error);
    }

    return response.status(200).send({"message":"Email alterado com sucesso", id, newEmail});
  }

};
