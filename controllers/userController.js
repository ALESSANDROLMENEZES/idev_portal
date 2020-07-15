const bk = require('bcrypt');
const { User } = require('../models');
const validator = require('validator');
 
module.exports = {
    index: async () => {
        const users = await User.findAll();
        return users;
    },
    
    store: async (user) => {
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