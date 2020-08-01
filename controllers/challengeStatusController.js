const { ChallengeStatus } = require('../models');

module.exports = {

    store: async (req, res) => {
        try {

            let { description } = req.body;
            
            const alreadyExistis = await ChallengeStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await ChallengeStatus.create({description});
            return res.status(200).json({ result });  
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },
 

    destroy: async (req, res) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            
            const { id } = req.params;

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
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },


    index: async (req, res) => {
        try {
            const { limit = 7 } = req.query;
            let result = await ChallengeStatus.findAll({ limit });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    show: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(422).json({ error: true, msg:'Informe um id'});
            }
            let result = await ChallengeStatus.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    update: async (req, res) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {

            let { description } = req.body;
            const { id } = req.params;

            if (isNaN(id)) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await ChallengeStatus.findByPk(challengeStatus.id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
            }

            let result = await ChallengeStatus.update(challengeStatus, { where: { id } });
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    }

};