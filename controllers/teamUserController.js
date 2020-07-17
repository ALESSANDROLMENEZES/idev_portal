const { TeamUser, Team, User } = require('../models');

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};

module.exports = {
    
    store: async (teamUser) => {
        try {
            if (validateId(teamUser.teamId) || validateId(teamUser.userId)) {
                return Error('Informe um id válido');
            }
            const result = await TeamUser.create({ challengeId });
            return result;
        } catch (error) {
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
                        model: User,
                        as: 'team_member',
                        required: 'true',
                    }
                ],
            });

            return result;
            
        } catch (error) {
            return error;
        }  
    },
};