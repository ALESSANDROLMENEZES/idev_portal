const { Challenge, Module, ChallengeStatus } = require('../models');

const validateChallenge = async (challenge) => {
    let msg;
    try {
        let statusExist = await ChallengeStatus.findByPk(challenge.statusId);
        let moduleExist = await Module.findByPk(challenge.moduleId);
        
        if (!statusExist || !moduleExist) {
            (statusExist) ? msg = 'O módulo informado não está  disponível' : msg = 'O status informado não está  disponível';
            return { status:422, msg };
        }
        
        if (!challenge.slides.includes('/embed?') || !challenge.slides.includes('https://docs')) {
        msg = 'Informe um válido link do google slides';
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
            
            const result = await Challenge.destroy(id);
            transaction.commit();
            return result;
            
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return 'Ocorreu um erro';
        }
    }
    
};

