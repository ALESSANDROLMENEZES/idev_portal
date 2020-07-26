const { Questionnaire, Question, Answer } = require('../models');

module.exports = {
    
    index: async (id) => {
        try {
            const result = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'question_answers',
                        required: true,
                    }
                ],
                where:{id}
            });
            return result;
        } catch (error) {
            console.log(error);
            return { error:true, status:422, msg:error.message};
        }  
    },
    
};