const { Answer, QuestionAnswer, Question } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  
    store: async (req, res) => {
        const transaction = await Answer.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let { questionId } = req.params;

            const { description, avaliable } = req.body;

            const questionExist = await Question.findByPk(questionId);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada uma questão para o id informado'});
            }

            const result = await Answer.create({ description, avaliable });

            await QuestionAnswer.create({questionId, answerId:result.id});
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    update: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { id } = req.params;
            const { description, avaliable } = req.body;
            const answerExist = await Answer.findByPk(id);
            if (!answerExist) {
                return res.status(422).json({ error: true, msg:'A resposta informada não foi encontrada'});
            }
            answerExist.description = description;
            answerExist.avaliable = avaliable;
            const result = await answerExist.save();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    destroy: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const answerExist = await Answer.findByPk(id);
            if (!answerExist) {
                return res.status(422).json({ error: true, msg:'A resposta informada não foi encontrada'});    
            }
            const result = await answerExist.destroy();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    show: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const result = await Answer.findByPk(id);
            if (!result) {
                return res.status(422).json({ error: true, msg:'A resposta informada não foi encontrada'});    
            }
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    index: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { limit = 7, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const { count: size, rows: result } = await Answer.findAndCountAll({
                limit,
                offset: page * limit
            });
            return res.status(200).json({size, result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};