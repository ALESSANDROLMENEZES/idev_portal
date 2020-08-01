const { Question, Answer } = require('../models');

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
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }  
    },
    
    update: async (question) => {
        try {
            const questionExist = await Question.findByPk(question.id);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada a questão informada'});
                
            }
            questionExist.text = question.text;
            questionExist.rightAnswerId = question.rightAnswerId;
            const result = await questionExist.save();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    destroy: async (id) => {
        try {
            const questionExist = await Question.findByPk(id);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada a questão informada'});
                
            }
            const result = await questionExist.destroy();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    show: async (id) => {
        try {
            const result = await Question.findByPk(id);
            if (!result) {
                return { };
            }
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    store: async (question) => {
        try {
            const result = await Question.create(question);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }  
    },
    
};