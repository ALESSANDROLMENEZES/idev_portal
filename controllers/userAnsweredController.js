const { UserAnswered, Question, Answer } = require('../models');

module.exports = {
    
    store: async (userAnswered) => {
        const transaction = await UserAnswered.sequelize.transaction();
        try {
            const questionnaireExist = await Question.findByPk(userAnswered.questionId);
            if (!questionnaireExist) {
                return { error: true, status: 422, msg: 'Não foi encontrado o questionário informado' };
            }
            const answerExist = await Answer.findByPk(userAnswered.answerId);
            
            if (!answerExist) {
                return { error: true, status: 422, msg: 'Não foi encontrado a resposta informada' };
            }
            
            const result = await UserAnswered.create(userAnswered);
            await transaction.commit();
            return result;
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: error.message };
        }
    },
    
    update: async (userAnswered) => {
        const transaction = await UserAnswered.sequelize.transaction();
        try {
            const userAnswerExist = await UserAnswered.findByPk(userAnswered.id);
            if (!userAnswerExist) {
                return { error: true, status: 422, msg: 'Não foi encontrado a resposta informada' };
            }
            const result = await UserAnswered.update(userAnswered, { where: { id: userAnswered.id } });
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: error.message };
        }
    }
    
};