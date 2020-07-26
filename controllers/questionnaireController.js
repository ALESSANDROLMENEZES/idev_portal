const { Questionnaire, Question, Answer } = require('../models');

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
    
};