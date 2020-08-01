const { Team, User, Challenge,FeedbackStatus } = require('../models');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 6, admin: true };
const minCoinsToFeedback = { admin:0, user:1};

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};


module.exports = {
    store: async (req, res) => {
        try {
            
            const { challengeId, statusId, github } = req.body;
            
            const avaliableChallenge = await Challenge.findByPk(challengeId, {where:{statusId:1}});
            if (!avaliableChallenge) {
                return res.status(422).json({ error: true, msg:'Este desafio não está mais disponível'});
            }
            
            const NOW = new Date();
            const currentDate = moment(NOW);
            const expiresAt = moment(avaliableChallenge.expiresAt);
            
            if (expiresAt < currentDate) {
                avaliableChallenge.statusId = 3;
                await avaliableChallenge.save();
                return res.status(422).json({ error: true, msg:'Este desafio expirou'});   
            }
            
            const result = await Team.create({ challengeId, statusId, github });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
    
    update: async (req, res) => {
        try {
            
            const { id } = req.params;
            const { challengeId, statusId, github } = req.body;
            
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
                return res.status(422).json({ error: true, msg:'O time informado não está disponível'});
            }
            
            teamExist.challengeId = challengeId;
            teamExist.statusId = statusId;
            teamExist.github = github;
            const result = await teamExist.save();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
    
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
            return res.status(422).json({ error: true, msg:'Não foi encontrado o time informado'});
            }
            
            const result = await Team.destroy({ where: { id } });
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});

        }  
    },
    
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            let coins;
            (connectedUser.admin) ? coins = 0 : coins = 1;
            
            if (validateId(id)) {
            return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            
            const result = await Team.findByPk(id, {
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
                ]
            });
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
        }  
    },
    
    
    index: async (req, res) => {
        try {
            let coins;
            let { limit = 14, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            (connectedUser.admin) ? coins = minCoinsToFeedback.admin : coins = minCoinsToFeedback.user;
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