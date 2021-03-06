const { Module, UserModule } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { validationResult } = require('express-validator');

module.exports = {
    store: async (req, res) => {
        const transaction = await Module.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, avaliable } = req.body;
            const result = await Module.create({ title, avaliable });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    index: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { user } = req;
            if (user.admin) {
                let { rows: result, count:size } = await Module.findAndCountAll();
                return res.status(200).json({ size, result });
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
                let { rows: result, count:size } = await Module.findAndCountAll({
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                });
                return res.status(200).json({ size, result });
            }
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (req, res) => {
        const transaction = await Module.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

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
            
            if (!req.user.admin) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Você não tem autorização para exclusão'});
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

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