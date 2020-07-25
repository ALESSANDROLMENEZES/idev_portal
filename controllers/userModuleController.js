const { UserModule, User, Module } = require('../models');

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
            const moduleAlreadyAvaliableToUser = await UserModule.findOne({
                where: {
                    userId: userModule.userId,
                    moduleId:userModule.moduleId
                }
            });

            if (moduleAlreadyAvaliableToUser) {
                return { error: true, status: 422, msg:'O módulo informado já está ativo para o usuário'}; 
            }

            const result = await UserModule.create(userModule);
            return result;

        } catch (error) {
            console.log(error);
            return { error: true, status: 422, msg:error.message};
        }
    }

};