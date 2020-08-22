const { Team, User, Challenge,FeedbackStatus } = require('../models');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const minCoinsToFeedback = { admin: 0, user: 1 };
const { validationResult } = require('express-validator');

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};


module.exports = {
    store: async (req, res) => {
        const transaction = await Team.sequelize.transaction()
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { challengeId, statusId, github } = req.body;
            
            const avaliableChallenge = await Challenge.findByPk(challengeId, {where:{statusId:1}});
            if (!avaliableChallenge) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Este desafio não está mais disponível'});
            }
            
            const NOW = new Date();
            const currentDate = moment(NOW);
            const expiresAt = moment(avaliableChallenge.expiresAt);
            
            if (expiresAt < currentDate) {
                avaliableChallenge.statusId = 3;
                await avaliableChallenge.save();
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Este desafio expirou'});   
            }
            
            const result = await Team.create({ challengeId, statusId, github });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
    
    update: async (req, res) => {
        const transaction = await Team.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { challengeId, statusId, github } = req.body;
            
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O time informado não está disponível'});
            }
            
            teamExist.challengeId = challengeId;
            teamExist.statusId = statusId;
            teamExist.github = github;
            const result = await teamExist.save();
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
    
    destroy: async (req, res) => {
        const transaction = await Team.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
                await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Não foi encontrado o time informado'});
            }
            
            const result = await teamExist.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
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
            const { user } = req;
            const { id } = req.params;
            let coins = (user.admin) ? minCoinsToFeedback.admin : minCoinsToFeedback.user;
            
            if (validateId(id)) {
            return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            console.log(coins)
            const result = await Team.findOne({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                        where:{coins:{[Op.gte]:coins}}
                    },
                    {
                        model: Challenge,
                        as: 'challenge_team',
                        required: true,
                        attributes:['score', 'xp']
                    },
                    {
                        model: FeedbackStatus,
                        as: 'feedback_status',
                        required: true,
                    },
                ],
                where:{id}
            });
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
        }  
    },
    
    
    index: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { user } = req;
            let { limit = 14, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            let coins = (user.admin) ? minCoinsToFeedback.admin : minCoinsToFeedback.user;
            const { rows: result, count:size } = await Team.findAndCountAll({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                        where:{coins:{[Op.gte]:coins}}
                    },
                    {
                        model: Challenge,
                        as: 'challenge_team',
                        required: true,
                        attributes:['score', 'xp']
                    },
                    {
                        model: FeedbackStatus,
                        as: 'feedback_status',
                        required: true,
                    },
                ],
                limit,
                offset:limit*page
            });
            
            return res.status(200).json({ size, result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message });
        }  
    },
};