const { Challenge, Module, ChallengeStatus, UserModule } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validateChallenge = async (challenge) => {
    let msg;
    try {
        let statusExist = await ChallengeStatus.findByPk(challenge.statusId);
        let moduleExist = await Module.findByPk(challenge.moduleId);
        
        if (!statusExist || !moduleExist) {
            (statusExist) ? msg = 'O módulo informado não está disponível' : msg = 'O status informado não está disponível';
            return { status:422, msg };
        }
        
        if (!challenge.slides.includes('/embed?') || !challenge.slides.includes('https://docs')) {
        msg = 'Informe um válido link do google slides';
        return { status:422, msg };
        }

        if ((new Date(challenge.expiresAt)) <= (new Date())) {
            msg = 'A data de expiração deve ser maior que a data atual';
            return { status:422, msg };
        }
    
    return { status: 200, msg: 'Ok' };
    
} catch (error) {
    return { status: 501, msg: error.message };
}
};


module.exports = {
    
    store: async (challenge) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            
            const validate = await validateChallenge(challenge);
            
            if (validate.status != 200) {
                transaction.rollback();
                return validate.msg;
            }
            
            let result = await Challenge.create(challenge);
            
            transaction.commit();
            return result;
            
        } catch (error) {
            console.log(error);
            transaction.rollback();
            return 'Ocorreu um erro';
        }
    },
    
    
    update: async (challenge) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            const validate = await validateChallenge(challenge);
            
            if (validate.status != 200) {
                transaction.rollback();
                return validate.msg;
            }
            
            const challengeExist = await Challenge.findByPk(challenge.id);
            
            if (!challengeExist) {
                transaction.rollback();
                return 'Não encontrei o desafio informado';
            }
            
            const result = await Challenge.update(challenge, { where: { id: challenge.id } });
            return result;
            
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return 'Ocorreu um erro';
        }
    },
    

    destroy: async (id) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            if (isNaN(id)) {
                transaction.rollback();
                return 'Informe um id válido';
            }
            const challengeExist = await Challenge.findByPk(id);
            
            if (!challengeExist) {
                transaction.rollback();
                return 'Não encontrei o desafio informado';
            }
            
            const result = await Challenge.destroy({ where: { id } });
            transaction.commit();
            return result;
            
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return 'Ocorreu um erro';
        }
    },

    index: async (conectedUser, status = 1, page = 1, limit = 14 ) => {
        //Usuário conectado é admin?
            //>Se sim, listar todos os desafios com paginação, independente de status ou módulo
        //Usuário não é admin
            //>Listar apenas os desafios ativos e
            //>Verificar quais módulos estão ativos para o usuário
            //>Listar desafios apenas de acordo com os modulos que estão disponíveis para o usuário
        try {

            limit = parseInt(limit);
            page = parseInt(page - 1);

            if (isNaN(limit) || isNaN(page)) {
                return [];
            }

            if (conectedUser.admin) {
                let { count: size, rows: result } = await Challenge.findAndCountAll({
                    where: { statusId: status },
                    limit,
                    offset: limit * page
                });
                return result;
            } 

            const userModules = await UserModule.findAll({
                where: {
                    userId:conectedUser.id
                }
            });

            if (!userModules) {
                return [];
            }

            const modules = userModules.map((elem) => elem.moduleId);

            let { count: size, rows: result } = await Challenge.findAndCountAll({
                where: {
                    statusId: 1,
                        moduleId: {
                            [Op.in]: modules
                        }
                },
                limit,
                offset: limit * page
            });
            
            return result;

        } catch (error) {
            console.log(error);
            return 'Ocorreu um erro';
        }
    }
    
};

