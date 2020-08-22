const { QuestionnaireQuestion, Questionnaire } = require('../models');

module.exports = {
    
    store: async (req, res) => {
        const transaction = await Questionnaire.sequelize.transaction();
        try {
            const { questionnaireId, questionId } = req.body;
            const questionnaireExist = await Questionnaire.findByPk(questionnaireId);
            if (!questionnaireExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'O questionário não está mais disponível' });
            }
            const questionExist = await Questionnaire.findByPk(questionId);
            if (!questionExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'O questão não está mais disponível' });
            }
            const result = await QuestionnaireQuestion.create({ questionnaireId, questionId });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    destroy: async (req, res) => {
        const transaction = await QuestionnaireQuestion.sequelize.transaction();
        try {
            const { id } = req.body;
            const questionnaireQuestionExist = await QuestionnaireQuestion.findByPk(id);
            const result = await questionnaireQuestionExist.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};