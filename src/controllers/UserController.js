const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        try {
            const users = await connection('usuarios').select('*');
            return response.send({users});
        
        } catch (error) {
            return response.status(400).send(error);
        }
        
    }
}
