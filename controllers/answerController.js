const { Answer } = require('../models');

module.exports = {
  
    store: async (req, res) => {
        try {
            const { description, avaliable } = req.body;
            const result = await Answer.create({ description, avaliable });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    update: async (req, res) => {
        try {
            const { id, description, avaliable } = req.body;
            const answerExist = await Answer.findByPk(id);
            if (!answerExist) {
                return res.status(422).json({ error: true, msg:'A resposta informada não foi encontrada'});
            }
            const result = await Answer.update({ description, avaliable }, { where: { id: answer.id } });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    destroy: async (req, res) => {
        try {
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