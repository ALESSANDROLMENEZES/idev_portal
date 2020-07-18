const { TeamUser, Team, User } = require('../models');

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};

module.exports = {
    store: async (teamUser) => {
        
        const transaction = await TeamUser.sequelize.transaction();
        try {
            
            if (validateId(teamUser.teamId) || validateId(teamUser.userId) || validateId(teamUser.challengeId)) {
                transaction.rollback();
                return Error('Informe um id válido');
            }
            
            //verificar se o usuário já tem um time
            const userAlredyInTeam = await TeamUser.findAll({
                include: [
                    {
                        model: Team,
                        as: 'members',
                        required: true,
                        where:{challengeId:teamUser.challengeId}
                    }
                ],
                where: {
                    challengeId:teamUser.challengeId
                }
            });
            
            if (userAlredyInTeam) {
                transaction.rollback();
                return { error: true, status:422, msg:'Este usuário já está cadastrado em outro time'};
            }
            
            //Por padrão o time é 0, assim será criado um time novo, caso contrário o usuário apenas 
            //será alocado à um time
            if (teamUser.teamId === '0' || teamUser.teamId === undefined) {
                const newTeam = await Team.create({ challengeId: parseInt(teamUser.challengeId) });
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
                return error;
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
                
                const result = await TeamUser.update(teamUser, { where: { id: teamUser.id } });
                
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
                
                const result = await TeamUser.destroy(teamUser, { where: { teamUser } });
                
                return result;
                
            } catch (error) {
                return error;
            }  
        },   
        
        index: async (limit=14, page = 1) => {
            try {
                
                const result = await TeamUser.findAll({
                    include: [
                        {
                            model: Team,
                            as: 'users',
                            required: true,
                            where:{challengeId:1}
                        }
                    ],
                    where: {
                        challengeId:1
                    },
                    limit
                });
                
                return result;
                
            } catch (error) {
                return error;
            }  
        },
    };