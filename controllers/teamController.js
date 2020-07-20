const { Team, User, sequelize } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 6, admin: true };

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};

const EmDesenvolvimento = 1;
module.exports = {
    store: async (challengeId) => {
        try {
            if (validateId(challengeId)) {
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            const result = await Team.create({ challengeId, statusId:EmDesenvolvimento });
            return result;
        } catch (error) {
            return error;
        }  
    },
    

    update: async (team) => {
        try {
            if (validateId(team.id)) {
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            
            const teamExist = await Team.findByPk(team.id);
            if (!teamExist) {
                return { error: true, status:422, msg:'O time informado não está disponível'};
            }

            const result = await Team.update(team, { where: { id:team.id } });

            return result;

        } catch (error) {
            return error;
        }  
    },
    

    destroy: async (id) => {
        try {
            if (validateId(id)) {
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
                return { error: true, status:422, msg:'O time informado não está disponível'};
            }

            const result = await Team.destroy({ where: { id } });

            return result;

        } catch (error) {
            return error;
        }  
    },

    
    show: async (id) => {
        try {
            let coins;
            (connectedUser.admin) ? coins = 0 : coins = 1;

            if (validateId(id)) {
                return { error: true, status:422, msg:'Informe um id válido'};
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

            return result;

        } catch (error) {
            return error;
        }  
    },
    

    index: async (limit=14, page = 1) => {
        try {
            let coins;
            (connectedUser.admin) ? coins = 0 : coins = 1;
            const result = await Team.findAll({
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
            
            return result;
        } catch (error) {
            return error;
        }  
    },
};