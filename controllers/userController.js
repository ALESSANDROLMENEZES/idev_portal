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
        console.log(!(validator.isEmail(user.email)), user.email);
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
    }
};