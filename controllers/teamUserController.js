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
                return { error: true, status:422, msg:'Informe um id válido'};
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
                return { error: true, status:422, msg:'Este usuário já está cadastrado em outro time'};
            }
            
            if (teamUser.teamId === undefined || ((parseInt(teamUser.teamId)) === 0)) {
                const newTeam = await Team.create({
                    challengeId: teamUser.challengeId
                });
                teamUser.teamId = newTeam.id;
            }
            
            const result = await TeamUser.create({
                teamId: parseInt(teamUser.teamId),
                userId: parseInt(teamUser.userId)
            });

            transaction.commit();
            return result;
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return { error: true, status:422, msg:error.message};
        }  
    },
    
    
    update: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            
            const teamExist = await TeamUser.findByPk(teamUser.id);
            if (!teamExist) {
                return { error: true, status:422, msg:'O time informado não está disponível'};
            }
            
            const result = await TeamUser.update({
                teamId:teamUser.teamId,
                userId:teamUser.userId
            },
            {
                where: { id: teamUser.id }
            });
            
            return result;
            
        } catch (error) {
            console.log(error);
            return { error: true, status:422, msg:error.message};
        }  
    },
    
    
    destroy: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            
            const foundTeamUser = await TeamUser.findOne({
                where: {
                    teamId: teamUser.teamId,
                    userId: teamUser.userId
                }
            });

            console.log(foundTeamUser);

            const result = await foundTeamUser.destroy();
           
            return result;
            
        } catch (error) {
            return error;
        }  
    },   
    
    index: async (limit=14, page = 1) => {
        try {
            
            const result = await Team.findAll({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                    }
                ],
                limit
            });
            
            return result;
            
        } catch (error) {
            return error;
        }  
    },
};