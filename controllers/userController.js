const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bk = require('bcrypt');
const { User } = require('../models');
const validator = require('validator');

module.exports = {
    index: async (user) => {
        try {
            (!user.email) ? user.email = '' : user.email;
            (!user.name) ? user.name = '' : user.name;
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { email: { [Op.like]:`%${user.email}%`} },
                        { name:{[Op.like]:`%${user.name}%`}}
                    ]
                },
                limit:7
            });
            return users;   
        } catch (error) {
            return [];
        }
    },
    
    store: async (user) => {
        try {
            if (!user.email || !user.password) {
                return 'Informe, email e senha';
            }
            if (!(validator.isEmail(user.email))) {
                return 'Email inválido'; 
            }
            const alreadyExistis = await User.findOne({ where: { email: user.email } });
            if (alreadyExistis) {
                return 'Email já cadastrado'; 
            }
            user.email = user.email.toLowerCase();
            const result = await User.create(user);
            return result;               
        } catch (error) {
            return 'Ocorreu um erro';   
        }
    },
    
    show: async (user) => {
        if (!user.email) {
            return 'Informe um email';
        }
        if (!user.password) {
            return 'Informe sua senha';
        }
        if(!(validator.isEmail(user.email))){
            return 'Email inválido';
        }
        user.email = user.email.toLowerCase();
        const result = await User.findOne({ where: { email: user.email } });
        if (!result) {
            return 'Email ou senha inválido';
        }
        const passMatch = bk.compareSync(user.password, result.password);
        if (!passMatch) {
            return 'Email ou senha inválido';
        }
        return result;
    }
};