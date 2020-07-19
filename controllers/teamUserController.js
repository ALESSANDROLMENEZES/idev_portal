const { TeamUser, Team, User } = require('../models');

const validateId = (id) => {
    return (isNaN(id));
};

module.exports = {
    store: async (teamUser) => {
        const transaction = await Team.sequelize.transaction();
        try {
            
            if (teamUser.teamId || validateId(teamUser.userId) || validateId(teamUser.challengeId)) {
                transaction.rollback();
                return { error: true, status:422, msg:'Informe um id válido'};
            }
            
            //verificar se o usuário já está em algum time
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
            

            if (userAlredyInTeam.id) {
                transaction.rollback();
                return { error: true, status:422, msg:'Este usuário já está cadastrado em outro time'};
            }
            
            //Por padrão o time é 0, assim será criado um time novo, caso contrário o usuário apenas 
            //será alocado à um time
            if ((parseInt(teamUser.teamId) === 0) || teamUser.teamId === undefined) {
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
                return Error('Informe um id válido');
            }
            
            const teamExist = await TeamUser.findByPk(teamUser.id);
            if (!teamExist) {
                return Error('O time informado não está disponível');
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
            return error;
        }  
    },
    
    
    destroy: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return Error('Informe um id válido');
            }
            
            const result = await TeamUser.destroy({ where: { teamUser } });
            
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