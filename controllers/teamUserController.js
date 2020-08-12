const { TeamUser, Team, User, Challenge } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment');

const validateId = (id) => {
    return (isNaN(id));
};

module.exports = {
    store: async (req, res) => {
        const transaction = await Team.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            
            let { teamId = 0, userId, challengeId } = req.body;
            
            
            const avaliableChallenge = await Challenge.findByPk(challengeId);
            const NOW = new Date();
            const currentDate = moment(NOW);
            const expiresAt = moment(avaliableChallenge.expiresAt);
            
            if (expiresAt < currentDate) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Este desafio expirou' });
            }
            
            
            const userAlredyInTeam = await Team.findAll({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                        where: { id: userId }
                    }
                ],
                where: {
                    challengeId
                }
            });
            
            if (userAlredyInTeam[0] !== undefined) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Este usuário já está cadastrado em outro time'});
            }
            
            if (teamId == 0) {
                const newTeam = await Team.create({
                    challengeId,
                    statusId:1 //Em desenvolvimento
                });
                teamId = newTeam.id;
            }
            
            const result = await TeamUser.create({ teamId, userId });
            
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
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
            
            const { teamId, userId } = req.body;
            
            if (validateId(teamId) || validateId(userId)) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            
            const teamExist = await TeamUser.findOne({where:{teamId, userId}});
            if (!teamExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O time informado não está disponível'});
            }
            
            teamExist.teamId = teamId;
            teamExist.userId = userId;
            await teamExist.save();
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
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
            
            const { teamId, userId } = req.params;
            
            const foundTeamUser = await TeamUser.findOne({
                where: {
                    teamId,
                    userId
                }
            });
            
            if (!foundTeamUser) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Não foi encontrado o usuário no time informado'}); 
            }

            const result = await foundTeamUser.destroy();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
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
            
            let { limit = 14, page = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const { rows: result, count: size } = await Team.findAll({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                    }
                ],
                limit,
                offset:limit*page
            });
            
            return res.status(200).json({ size, result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
        }  
    },
};