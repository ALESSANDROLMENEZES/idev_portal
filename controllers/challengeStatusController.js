const { ChallengeStatus } = require('../models');

module.exports = {

    store: async (challengeStatus) => {
        try {
            
            if (!challengeStatus) {
                return res.status(422).json({ error: true, msg:'Informe uma descrição'});
            }
            
            let description = challengeStatus.description;
            if (!description) {
                return res.status(422).json({ error: true, msg:'Informe uma descrição'});
            }
            
            const alreadyExistis = await ChallengeStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            challengeStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await ChallengeStatus.create(challengeStatus);
            return result;  
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },
 

    destroy: async (id) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            
            if (isNaN(id)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }

            let statusExists = await ChallengeStatus.findByPk(id);

            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status já foi excluido'});
            }

            let result = await ChallengeStatus.destroy({ where: { id } });
            
            await transaction.commit();
            return result;

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },


    index: async (limit=7) => {
        try {
            let result = await ChallengeStatus.findAll({ limit });
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    show: async (id) => {
        try {
            if (!id) {
                return res.status(422).json({ error: true, msg:'Informe um id'});
            }
            let result = await ChallengeStatus.findByPk(id);
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    update: async (challengeStatus) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            if (!challengeStatus) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um status'});
            }
            if (!challengeStatus.id) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});
            }
            let description = challengeStatus.description || false;
            if (!description) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});
            }
            
            challengeStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await ChallengeStatus.findByPk(challengeStatus.id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
            }

            let result = await ChallengeStatus.update(challengeStatus, { where: { id: challengeStatus.id } });
            return result;

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    }

};