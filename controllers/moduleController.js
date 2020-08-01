const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Module, UserModule } = require('../models');

module.exports = {
    
    store: async (mod) => {
        try {
            if (!mod.title) {
                return res.status(422).json({ error: true, msg:'Informe um titulo'});
            }  
            if (mod.title.length > 80) {
                return res.status(422).json({ error: true, msg:'Informe um titulo menor que 80 caracteres'});
            }  
            const result = await Module.create(mod);
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    
    index: async (user) => {
        try {
            let result;
            if (!user) {
                return res.status(422).json({ error: true, msg:'Você precisa realizar o login'});
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
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (mod) => {
        const transaction = await Module.sequelize.transaction();
        try {
            if (!mod) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um módulo'});
                
            }
            if (!mod.id) {
                await transaction.rollback(); 
                return res.status(422).json({ error: true, msg:'Informe um módulo'});
                
            }
            let result = await Module.update(mod, { where: { id: mod.id } });
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    
    destroy: async (id) => {
        const transaction = await Module.sequelize.transaction();
        try {
            
            if (!id) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'informe um id'});
                
            }
            
            if (isNaN(id)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id válido'});

            }
            
            let moduleExists = await Module.findByPk(id);
            
            if (!moduleExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O módulo já foi excluido'});

            }
            
            let result = await Module.destroy({ where: { id } });
            
            await transaction.commit();
            return result;
            
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
};