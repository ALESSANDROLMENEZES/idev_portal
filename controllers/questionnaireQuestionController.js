const { QuestionnaireQuestion, Question, Questionnaire } = require('../models');

module.exports = {

    store: async (questionnaireQuestion) => {
        try {
            const questionnaireExist = await Questionnaire.findByPk(questionnaireQuestion.questionnaireId);
            if (!questionnaireExist) {
                return res.status(422).json({ error: true, msg: 'O questionário não está mais disponível' });
            }
            const questionExist = await Questionnaire.findByPk(questionnaireQuestion.questionId);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg: 'O questão não está mais disponível' });
            }
            const result = await QuestionnaireQuestion.create(questionnaireQuestion);
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    destroy: async (id) => {
        try {
            const questionnaireQuestionExist = await QuestionnaireQuestion.findByPk(id);
            const result = await questionnaireQuestionExist.destroy();
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }

};