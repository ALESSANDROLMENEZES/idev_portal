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
    }
    
};