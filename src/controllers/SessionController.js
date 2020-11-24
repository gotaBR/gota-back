const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
    async login(request, response){
        const {email, senha} = request.body;
        try{
            [user] = await connection('usuarios').where('email', email).select('*');
        }
        catch(error){
            return response.status(400).send(error);
        }

        if(!user){
            return response.status(404).send("Could not find this email.");
        }

        bcrypt.compare(senha, user.senha, function(error, same){
            if(same){
                const id = user.id;
                return response.status(200).send({id, message: "Usuário logado"});
            }
            else{
                return response.status(401).send({error, message: "Senha errada"});
            }
        })
    }
}