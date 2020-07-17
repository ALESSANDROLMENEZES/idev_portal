const { Team, User,TeamUser } = require('../models');

const validateId = (id) => {
    id = parseInt(id);
    return (isNaN(id));
};

module.exports = {
    
    store: async (challengeId) => {
        try {
            if (validateId(challengeId)) {
                return Error('Informe um id válido');
            }
            const result = await Team.create({ challengeId });
            return result;
        } catch (error) {
            return error;
        }  
    },
    

    update: async (team) => {
        try {
            if (validateId(team.id)) {
                return Error('Informe um id válido');
            }
            
            const teamExist = await Team.findByPk(team.id);
            if (!teamExist) {
                return Error('O time informado não está disponível');
            }

            const result = await Team.update(team, { where: { id: team.id } });

            return result;

        } catch (error) {
            return error;
        }  
    },
    

    destroy: async (id) => {
        try {
            if (validateId(id)) {
                return Error('Informe um id válido');
            }
            
            const teamExist = await Team.findByPk(id);
            if (!teamExist) {
                return Error('O time informado não está disponível');
            }

            const result = await Team.destroy(team, { where: { id } });

            return result;

        } catch (error) {
            return error;
        }  
    },

    
    show: async (id) => {
        try {
            if (validateId(id)) {
                return Error('Informe um id válido');
            }
            
            const result = await Team.findByPk(id);

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
                        required:true
                    }
                ]
            });
            
            return result;
        } catch (error) {
            return error;
        }  
    },
};