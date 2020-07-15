const { User } = require('../models');
module.exports = {
    index: async () => {
        const users = await User.findAll();
        return users;
    }  
};