const { ChallengeStatus } = require('../models');

module.exports = {

    store: async (challengeStatus) => {
        try {
            if (!challengeStatus) {
                return 'Informe uma descrição';
            }
            let description = challengeStatus.description || false;
            if (!description) {
                return 'Informe uma descrição';
            }
            const alreadyExistis = await ChallengeStatus.findOne({ where: { description} });
            if (alreadyExistis) {
                return 'Já existe um status com essa descrição'; 
            }
            challengeStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            const result = await ChallengeStatus.create(challengeStatus);
            return result;               
        } catch (error) {
            console.log(error);
            return 'Ocorreu um erro';   
        }
    },
 
    destroy: async (challengeStatus) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            if (!challengeStatus) {
                await transaction.rollback();
                return 'Informe um status'; 
            }
            if (!challengeStatus.id) {
                await transaction.rollback();
                return 'Informe um status'; 
            } 
            let statusExists = await ChallengeStatus.findByPk(challengeStatus.id);
            if (!statusExists) {
                await transaction.rollback();
                return 'O status já foi excluido'; 
            }
            let result = await ChallengeStatus.destroy({ where: { id: challengeStatus.id } });
            await transaction.commit();
            return result;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return 'Ocorreu um erro';
        }
    },

    index: async (limit=7) => {
        try {
            let result = await ChallengeStatus.findAll({ limit });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    show: async (id) => {
        try {
            if (!id) {
                return 'Informe um id';
            }
            let result = await ChallengeStatus.findByPk(id);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    update: async (challengeStatus) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            if (!challengeStatus) {
                await transaction.rollback();
                return 'Informe um status';
            }
            if (!challengeStatus.id) {
                await transaction.rollback();
                return 'Informe um id para o status';
            }
            let description = challengeStatus.description || false;
            if (!description) {
                await transaction.rollback();
                return 'Informe um id para o status';
            }
            
            challengeStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await ChallengeStatus.findByPk(challengeStatus.id);
            
            if (!statusExists) {
                await transaction.rollback();
                return 'O status não existe'; 
            }

            let result = await ChallengeStatus.update(challengeStatus, { where: { id: challengeStatus.id } });
            return result;

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return error;
        }
    }

};