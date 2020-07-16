const { Challenge, Module, ChallengeStatus } = require('../models');

module.exports = {

    store: async (challenge) => {
        const transaction = await Challenge.sequelize.transaction();
        try {

            let statusExist = await ChallengeStatus.findByPk(challenge.statusId);
            let moduleExist = await Module.findByPk(challenge.moduleId);

            if (!statusExist || !moduleExist) {
                let msg;
                (statusExist) ? msg = 'O módulo informado não está  disponível' : msg = 'O status informado não está  disponível';
                transaction.rollback();
                return msg;
            }
            if (!challenge.slides.includes('/embed?') || !challenge.slides.includes('https://docs')) {
                transaction.rollback();
                return 'Informe um válido link do google slides';
            }

            let result = await Challenge.create(challenge);

            transaction.commit();
            return result;

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return 'Ocorreu um erro';
        }
    }

};

