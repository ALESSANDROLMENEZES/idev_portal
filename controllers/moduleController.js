const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Module, User_module } = require('../models');
module.exports = {
    store: async (mod) => {
        try {
            if (!mod.title) {
                return 'Informe um titulo';
            }  
            if (mod.title.length > 80) {
                return 'Informe um titulo menor que 80 caracteres';
            }  
            const result = await Module.create(mod);
            return result;
        } catch (error) {
            return 'Ocorreu um erro';
        }
    },

    index: async (user) => {
        let result;
        if (!user) {
            return 'Você precisa realizar o login';
        }
        if (user.admin) {
            result = await Module.findAll();
            return result;
        } else {
            const moulesAvaliableForUser = await User_module.findAll({
                where: {
                    userId: user.id
                }
            });
            if (!moulesAvaliableForUser) {
                return [];
            }
            
            const ids = moulesAvaliableForUser.map((item) => item.dataValues.userId);
            result = await Module.findAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            return result;
        }
    }
};