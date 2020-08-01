const { TeamUser, Team, User } = require('../models');

const validateId = (id) => {
    return (isNaN(id));
};

module.exports = {
    store: async (teamUser) => {
        const transaction = await Team.sequelize.transaction();
        try {
            
            if (validateId(teamUser.teamId) || validateId(teamUser.userId) || validateId(teamUser.challengeId)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg: 'informe um id válido'});
            }
            
            const userAlredyInTeam = await Team.findAll({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                        where: { id: teamUser.userId }
                    }
                ],
                where: {
                    challengeId:teamUser.challengeId
                }
            });
            
            if (userAlredyInTeam[0] !== undefined) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Este usuário já está cadastrado em outro time'});
            }
            
            if (teamUser.teamId === undefined || ((parseInt(teamUser.teamId)) === 0)) {
                const newTeam = await Team.create({
                    challengeId: teamUser.challengeId,
                    statusId:teamUser.statusId
                });
                teamUser.teamId = newTeam.id;
            }
            
            const result = await TeamUser.create({
                teamId: parseInt(teamUser.teamId),
                userId: parseInt(teamUser.userId)
            });
            
            transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },
    
    
    update: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            
            const teamExist = await TeamUser.findByPk(teamUser.id);
            if (!teamExist) {
                return res.status(422).json({ error: true, msg:'O time informado não está disponível'});
            }
            
            const result = await TeamUser.update({
                teamId:teamUser.teamId,
                userId:teamUser.userId
            },
            {
                where: { id: teamUser.id }
            });
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },
    
    
    destroy: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return res.status(422).json({ error: true, msg:'informe um id válido'});
            }
            
            const foundTeamUser = await TeamUser.findOne({
                where: {
                    teamId: teamUser.teamId,
                    userId: teamUser.userId
                }
            });
            
            const result = await foundTeamUser.destroy();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },   
    
    index: async (limit=14, page = 1) => {
        try {
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const result = await Team.findAll({
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
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
        }  
    },
};