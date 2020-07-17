const { FeedbackStatus } = require('../models');

module.exports = {

    store: async (feedbackStatus) => {
        try {
            
            if (!feedbackStatus) {
                return 'Informe uma descrição';
            }
            
            let description = feedbackStatus.description;
            if (!description) {
                return 'Informe uma descrição';
            }
            
            const alreadyExistis = await FeedbackStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                return 'Já existe um status com essa descrição'; 
            }
            
            feedbackStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await FeedbackStatus.create(feedbackStatus);
            return result;  
            
        } catch (error) {
            console.log(error);
            return 'Ocorreu um erro';   
        }
    },
 

    destroy: async (id) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            if (isNaN(id)) {
                transaction.rollback();
                return 'Informe um id válido';
            }

            let statusExists = await FeedbackStatus.findByPk(id);

            if (!statusExists) {
                await transaction.rollback();
                return 'O status já foi excluido'; 
            }

            let result = await FeedbackStatus.destroy({ where: { id } });
            
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
            let result = await FeedbackStatus.findAll({ limit });
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
            let result = await FeedbackStatus.findByPk(id);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    
    update: async (feedbackStatus) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            if (!feedbackStatus) {
                await transaction.rollback();
                return 'Informe um status';
            }
            if (!feedbackStatus.id) {
                await transaction.rollback();
                return 'Informe um id para o status';
            }
            let description = feedbackStatus.description || false;
            if (!description) {
                await transaction.rollback();
                return 'Informe um id para o status';
            }
            
            feedbackStatus.description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await FeedbackStatus.findByPk(feedbackStatus.id);
            
            if (!statusExists) {
                await transaction.rollback();
                return 'O status não existe'; 
            }

            let result = await FeedbackStatus.update(feedbackStatus, { where: { id: feedbackStatus.id } });
            return result;

        } catch (error) {
            console.log(error);
            transaction.rollback();
            return error;
        }
    }

};