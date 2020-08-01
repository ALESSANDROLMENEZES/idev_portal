const { QuestionnaireQuestion, Question, Questionnaire } = require('../models');

module.exports = {
    
    store: async (req, res) => {
        try {
            const { questionnaireId, questionId } = req.body;
            const questionnaireExist = await Questionnaire.findByPk(questionnaireId);
            if (!questionnaireExist) {
                return res.status(422).json({ error: true, msg: 'O questionário não está mais disponível' });
            }
            const questionExist = await Questionnaire.findByPk(questionId);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg: 'O questão não está mais disponível' });
            }
            const result = await QuestionnaireQuestion.create({ questionnaireId, questionId });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    destroy: async (req, res) => {
        try {
            const { id } = req.body;
            const questionnaireQuestionExist = await QuestionnaireQuestion.findByPk(id);
            const result = await questionnaireQuestionExist.destroy();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};