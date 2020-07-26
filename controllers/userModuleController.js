const { UserModule, User, Module } = require('../models');
const connectedUser = { id: 1 };
module.exports = {

    store: async (userModule) => {
        try {
            if (!userModule) {
                return { error: true, status: 422, msg:'Informe os dados a serem salvos'};
            }
            const moduleExist = await Module.findByPk(userModule.moduleId);
            if (!moduleExist) {
                return { error: true, status: 422, msg:'Não foi encontrado o módulo informado'};
            }
            if (!moduleExist.avaliable) {
                return { error: true, status: 422, msg:'O módulo informado não está ativo'};
            }
            const userExist = await User.findByPk(userModule.userId);
            if (!userExist) {
                return { error: true, status: 422, msg:'Não foi encontrado o usuário informado'};
            }
            if (!userExist.active) {
                return { error: true, status: 422, msg:'O usuário informado não está ativo'};
            }

            const [result, created ]= await UserModule.findOrCreate({ where: { userId: userModule.userId,
                moduleId:userModule.moduleId } });
            return { result, created };

        } catch (error) {
            console.log(error);
            return { error: true, status: 422, msg:error.message};
        }
    },

    index: async () => {
       try {
           const { count: size, rows: result } = await Module.findAndCountAll({
               include: [
                   {
                       model: User,
                       as: 'user_modules',
                       required: true,
                       attributes:['id'],
                       where: {
                        id:connectedUser.id
                    }      
                   }
               ],
               attributes: ['id', 'title', 'avaliable'],
               where:{avaliable:true}
           });
           return { result, size };
       } catch (error) {
           console.log(error);
           return { error: true, status: 422, msg: error.message };
       } 
    },

    destroy: async (userModule) => {
        const transaction = await UserModule.sequelize.transaction();
        try {
            const userModuleExist = await UserModule.findOne({
                where: {
                    userId: userModule.userId,
                    moduleId: userModule.moduleId
                }
            });
            const result = await userModuleExist.destroy();
            transaction.commit();
            return result;
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: error.message };
        }
    }

};