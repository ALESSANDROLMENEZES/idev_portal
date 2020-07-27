const { Questionnaire, Question, Answer, Class, QuestionAnswer, QuestionnaireQuestion } = require('../models');

module.exports = {
    
    index: async (classId, questionId) => {
        try {
            const result = await Questionnaire.findAndCountAll({
                include: [
                    {
                        model: Question,
                        as: 'questions_questionnaires',
                        required: true,
                        include: [
                            {
                                model: Answer,
                                as: 'question_answers',
                                required: true,
                            }
                        ],
                        where:{id:questionId}
                    }
                ],
                where: {
                    classId,
                    avaliable:true
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return { error:true, status:422, msg:error.message};
        }  
    },

    store: async (questionnaire) => {
        try {
            const classExist = await Class.findByPk(questionnaire.classId);
            if (!classExist) {
                return { error: true, status: 422, msg: 'A aula informada não está disponível' };
            }
            const result = await Questionnaire.create(questionnaire);
            return result;
        } catch (error) {
            console.log(error);
            return { error: true, status: 422, msg: error.message };
        }
    },

    destroy: async (id) => {
        const transaction = await Questionnaire.sequelize.transaction();
        try {
            const questionnaireExist = await Questionnaire.findByPk(id);
            if (!questionnaireExist) {
                return { error: true, status: 422, msg: 'O questionário informado não está disponível' };
            }
            const result = questionnaireExist.destroy();
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: error.message }; 
        }
    },

    update: async (questionnaire) => {
        const transaction = await Questionnaire.sequelize.transaction();      
        try {
            const questionnaireExist = await Questionnaire.findByPk(questionnaire.id);
            if (!questionnaireExist) {
                return { error: true, status: 422, msg: 'O questionário informado não está disponível' };
            }
            questionnaireExist.classId = questionnaire.classId;
            questionnaireExist.title = questionnaire.title;
            questionnaireExist.avaliable = questionnaire.avaliable;
            const result = await questionnaireExist.save();
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: error.message }; 
        }
    },

    show: async (id) => {
        try {
            const result = await Questionnaire.findByPk(id, {
                include:[{
                    model: Question,
                    as: 'questions_questionnaires',
                    required: true,
                    include: [
                        {
                            model: Answer,
                            as: 'question_answers',
                            required: true,
                        }
                    ]
                }]
            });
            return result;
        } catch (error) {
            console.log(error);
            return { error: true, status: 422, msg: error.message }; 
        }
    },

    storeAnswersAndLinkAllToQuestionAndQuestionnaire: async (answers, question, questionnaire, rigthAnswerIndex=0) => {
        const transaction = await Answer.sequelize.transaction();
        try {

            if (!answers[0]) {
                return 'Informe as perguntas em formato de array';
            }
            const createdAnswers = await Answer.bulkCreate(answers);

            question.rightAnswerId = createdAnswers[rigthAnswerIndex].id;

            const createdQuestion = await Question.create(question);

            const answersToQuestion = createdAnswers.map((q) => {
                return { questionId: createdQuestion.id, answerId: q.id };
            });

            await QuestionAnswer.bulkCreate(answersToQuestion);

            const createdQuestionnaire = await Questionnaire.create(questionnaire);

            const result = await QuestionnaireQuestion.create({
                questionnaireId: createdQuestionnaire.id,
                questionId: createdQuestion.id
            });

            await transaction.commit();

            return result;

        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return {
                error: true, status: 422, msg: error.message
            };
        }
    },
    
};