const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Module, UserModule } = require('../models');

module.exports = {
    
    store: async (req, res) => {
        try {
            const { title, avaliable } = req.body;
            const result = await Module.create({ title, avaliable });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    index: async (req, res) => {
        try {
            const user = conectedUser;
            if (user.admin) {
                result = await Module.findAll();
                return res.status(200).json({ result });
            } else {
                const moulesAvaliableForUser = await UserModule.findAll({
                    where: {
                        userId: user.id
                    }
                });
                if (!moulesAvaliableForUser) {
                    return [];
                }
                
                const ids = moulesAvaliableForUser.map((item) => item.userId);
                result = await Module.findAll({
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                });
                return res.status(200).json({ result });
            }
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (req, res) => {
        const transaction = await Module.sequelize.transaction();
        try {

            let { id } = req.params;
            const {title,  avaliable = 1} = req.body;

            let result = await Module.update({ title, avaliable }, { where: { id } });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    
    destroy: async (req, res) => {
        const transaction = await Module.sequelize.transaction();
        try {
            
            let { id } = req.params;
            let moduleExists = await Module.findByPk(id);
            
            if (!moduleExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O módulo não foi encontrado'});
            }
            
            let result = await moduleExists.destroy();
            
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
};