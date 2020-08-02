const { UserModule, User, Module } = require('../models');
const { Op } = require('sequelize/types');
const connectedUser = { id: 1 };
module.exports = {
    
    store: async (req, res) => {
        try {
            const { moduleId, userId } = req.body;

            const moduleExist = await Module.findByPk(moduleId);
            if (!moduleExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrado o módulo informado'});
            }
            if (!moduleExist.avaliable) {
                return res.status(422).json({ error: true, msg:'O módulo informado não está ativo'});
            }
            const userExist = await User.findByPk(userId);
            if (!userExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrado o usuário informado'});
            }
            if (!userExist.active) {
                return res.status(422).json({ error: true, msg:'O usuário informado não está ativo'});
            }
            
            const [result, created ]= await UserModule.findOrCreate({ where: { userId, moduleId } });
                return res.status(200).json({ result, created });
            } catch (error) {
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message});
            }
        },
        
        index: async (req, res) => {
            try {
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
                const { userId, moduleId } = req.params;
                const userModuleExist = await UserModule.findOne({
                    where: {
                        userId,
                        moduleId
                    }
                });
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