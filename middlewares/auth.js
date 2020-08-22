require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env;


module.exports = {

    validate: async (req, res, next)=>{
        
        try {
            if (!req.headers.autorization) {
                throw new Error('Informe a credencial no header');
            }   

            const token = req.headers.authorization.substring(7);

            const tokenUser = jwt.verify(token, SECRET_KEY);

            const conectedUser = await User.findByPk(tokenUser.user_id, {
                attributes:['admin', 'id']
            });

            if (!conectedUser) {
                throw new Error('Usuário não conectado');
            }

            req.user = {
                user_id: conectedUser.id,
                admin: conectedUser.admin
            };
  
            next();

        } catch (error) {
            console.error(error.message);
            return res.status(401).json({ error:error.message });
        }
    },

    generateToken: async (req, res, next) => {
        try {
            const { id } = req.user;
            if (!id) {
                throw new Error('Não foi encontrado um id de usuário');
            }
            const token = await jwt.sign({ user_id:id }, SECRET_KEY, { expiresIn: '2 days' });
            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }

};