const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Module, UserModule } = require('../models');

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
            console.log(error);
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
            const moulesAvaliableForUser = await UserModule.findAll({
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
    },
    

    update: async (mod) => {
        try {
            if (!mod) {
                return 'Informe um módulo'; 
            }
            if (!mod.id) {
                return 'Informe um módulo'; 
            }
            const transaction = await Module.sequelize.transaction();
            let result = await Module.update(mod, { where: { id: mod.id } });
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return 'Ocorreu um erro';
        }
    },

    
    destroy: async (id) => {
        const transaction = await Module.sequelize.transaction();
        try {

            if (!id) {
                await transaction.rollback();
                return 'Informe um módulo'; 
            }

            if (isNaN(id)) {
                transaction.rollback();
                return 'Não encontrei o módulo';
            }

            let moduleExists = await Module.findByPk(id);

            if (!moduleExists) {
                await transaction.rollback();
                return 'O módulo já foi excluido'; 
            }

            let result = await Module.destroy({ where: { id } });

            await transaction.commit();
            return result;

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return 'Ocorreu um erro';
        }
    }
};