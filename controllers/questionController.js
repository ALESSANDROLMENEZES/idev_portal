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

    update: async (question) => {
        try {
            const questionExist = await Question.findByPk(question.id);
            if (!questionExist) {
                return { error:true, status:422, msg:'Não foi encontrada a questão informada'};
            }
            questionExist.text = question.text;
            questionExist.rightAnswerId = question.rightAnswerId;
            const result = await questionExist.save();
            return result;
        } catch (error) {
            console.log(error);
            return { error:true, status:422, msg:error.message};
        }
    }
    
};