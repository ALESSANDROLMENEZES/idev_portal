const { ChallengeStatus } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    
    store: async (req, res) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            
            let { description } = req.body;
            
            const alreadyExistis = await ChallengeStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await ChallengeStatus.create({ description });
            await transaction.commit();
            return res.status(200).json({ result });  
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },
    
    
    destroy: async (req, res) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            
            let statusExists = await ChallengeStatus.findByPk(id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status já foi excluido'});
            }
            
            let result = await ChallengeStatus.destroy({ where: { id } });
            
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Ocorreu um erro'});
        }
    },
    
    
    index: async (req, res) => {
        try {
            const { limit = 7 } = req.query;
            let result = await ChallengeStatus.findAll({ limit });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            let result = await ChallengeStatus.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (req, res) => {
        const transaction = await ChallengeStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            
            let { description } = req.body;
            const { id } = req.params;
            
            if (isNaN(id)) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id para o status'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            let statusExists = await ChallengeStatus.findByPk(id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
            }
            
            let result = await ChallengeStatus.update({ description }, { where: { id } });
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};