const { FeedbackStatus } = require('../models');

module.exports = {

    store: async (feedbackStatus) => {
        try {
            
            if (!feedbackStatus) {
                return res.status(422).json({ error: true, msg:'Informe uma descrição'});
            }
            
            let description = feedbackStatus.description;
            if (!description) {
                return res.status(422).json({ error: true, msg:'Informe uma descrição'});
            }
            
            const alreadyExistis = await FeedbackStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            feedbackStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await FeedbackStatus.create(feedbackStatus);
            return res.status(200).json({ result }); 
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
 

    destroy: async (id) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            if (isNaN(id)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'informe um id válido'});
            }

            let statusExists = await FeedbackStatus.findByPk(id);

            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status já foi excluido'});
            }

            let result = await FeedbackStatus.destroy({ where: { id } });
            
            await transaction.commit();
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    index: async (limit=7) => {
        try {
            let result = await FeedbackStatus.findAll({ limit });
            return res.status(200).json({ result });
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
            let result = await FeedbackStatus.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    update: async (feedbackStatus) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            if (!feedbackStatus) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um status'});
            }
            if (!feedbackStatus.id) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});

            }
            let description = feedbackStatus.description || false;
            if (!description) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});

            }
            
            feedbackStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await FeedbackStatus.findByPk(feedbackStatus.id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
                
            }

            let result = await FeedbackStatus.update(feedbackStatus, { where: { id: feedbackStatus.id } });
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});

        }
    }

};