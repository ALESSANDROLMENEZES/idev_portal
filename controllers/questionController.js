const { Question, Answer } = require('../models');

module.exports = {
    
    index: async (req, res) => {
        try {
            const result = await Question.findAll({
                include: [
                    {
                        model: Answer,
                        as: 'question_answers',
                        required: true,
                    }
                ],
            });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }  
    },
    
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { text, rightAnswerId } = req.body;
            const questionExist = await Question.findByPk(id);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada a questão informada'});
            }
            questionExist.text = text;
            questionExist.rightAnswerId = rightAnswerId;
            const result = await questionExist.save();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    destroy: async (req, res) => {
        try {
            let { id } = req.params;
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
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Question.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    store: async (req, res) => {
        try {
            let { text, rightAnswerId } = req.body;
            const result = await Question.create({ text, rightAnswerId });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
};