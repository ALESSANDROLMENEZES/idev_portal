const { UserModule, User, Module } = require('../models');
const { Op } = require('sequelize');
const connectedUser = { id: 1, admin:true };
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
            
            if (!connectedUser.admin) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Você não tem acesso para vincular usuários'});
            }

            const { moduleId, userId } = req.body;
            
            const moduleExist = await Module.findByPk(moduleId);
            if (!moduleExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não foi encontrado o módulo informado'});
            }
            if (!moduleExist.avaliable) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O módulo informado não está ativo'});
            }
            const userExist = await User.findByPk(userId);
            if (!userExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não foi encontrado o usuário informado'});
            }
            if (!userExist.active) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O usuário informado não está ativo'});
            }
            
            const [result, created] = await UserModule.findOrCreate({ where: { userId, moduleId } });
            await transaction.commit();
            return res.status(200).json({ result, created });
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
            
            const id = (connectedUser.admin) ? '' : connectedUser.id;
            const { count: size, rows: result } = await Module.findAndCountAll({
                include: [
                    {
                        model: User,
                        as: 'user_modules',
                        required: true,
                        attributes:['id'],
                        where: {
                            id: { [Op.like]: `%${id}%` }
                        }      
                    }
                ],
                attributes: ['id', 'title', 'avaliable'],
                where:{avaliable:true}
            });
            return res.status(200).json({size, result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        } 
    },
    
    destroy: async (req, res) => {
        const transaction = await UserModule.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            if (!connectedUser.admin) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Você não tem acesso para desvincular usuários'});
            }
            
            const { userId, moduleId } = req.params;
            const userModuleExist = await UserModule.findOne({
                where: {
                    userId,
                    moduleId
                }
            });

            if (!userModuleExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não foi encontrado o módulo especificado'});
            }

            const result = await userModuleExist.destroy();
            transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};