const { Questionnaire, Question, Answer, Class } = require('../models');

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
    }
    
};