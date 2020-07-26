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
                return { error: true, status: 422, msg: 'Não foi a resposta informada' };
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


};