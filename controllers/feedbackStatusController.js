const { FeedbackStatus } = require('../models');

module.exports = {

    store: async (req, res) => {
        try {
            
            let { description } = req.body;
            
            if (!description) {
                return res.status(422).json({ error: true, msg:'Informe uma descrição'});
            }
            
            const alreadyExistis = await FeedbackStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await FeedbackStatus.create({ description });
            return res.status(200).json({ result }); 
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
 

    destroy: async (req, res) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            let { id } = req.params;

            let statusExists = await FeedbackStatus.findByPk(id);

            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status já foi excluido'});
            }

            let result = await statusExists.destroy();
            
            await transaction.commit();
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    index: async (req, res) => {
        try {
            let { limit } = req.query;
            let result = await FeedbackStatus.findAll({ limit });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    show: async (req, res) => {
        try {
            
            let { id } = req.params;

            let result = await FeedbackStatus.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    update: async (req, res) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            let { id } = req.params;
            let { description } = req.body;

            description = description || false;
            if (!description) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await FeedbackStatus.findByPk(id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
                
            }

            let result = await FeedbackStatus.update(feedbackStatus, { where: { id } });
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});

        }
    }

};