const { TeamUser, Team, User } = require('../models');

const validateId = (id) => {
    return (isNaN(id));
};

module.exports = {
    store: async (req, res) => {
        const transaction = await Team.sequelize.transaction();
        try {
            const { teamId, userId, challengeId } = req.body;
            if (validateId(teamId) || validateId(userId) || validateId(challengeId)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg: 'informe um id válido'});
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
                transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Este usuário já está cadastrado em outro time'});
            }
            
            if (teamId === undefined || ((parseInt(teamId)) === 0)) {
                const newTeam = await Team.create({
                    challengeId,
                    statusId:1 //Em desenvolvimento
                });
                teamUser.teamId = newTeam.id;
            }
            
            const result = await TeamUser.create({ teamId, userId });
            
            transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },
    
    
    update: async (req, res) => {
        try {

            const { teamId, userId } = req.body;

            if (validateId(teamId) || validateId(userId)) {
                return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            
            const teamExist = await TeamUser.findOne({where:{teamId, userId}});
            if (!teamExist) {
                return res.status(422).json({ error: true, msg:'O time informado não está disponível'});
            }
            
            teamExist.teamId = teamId;
            teamExist.userId = userId;
            await teamExist.save();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },
    
    
    destroy: async (req, res) => {
        try {

            const { teamId, userId } = req.params;

            if (validateId(teamId) || validateId(userId)) {
                return res.status(422).json({ error: true, msg:'informe um id válido'});
            }
            
            const foundTeamUser = await TeamUser.findOne({
                where: {
                    teamId,
                    userId
                }
            });
            
            const result = await foundTeamUser.destroy();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
            
        }  
    },   
    
    index: async (req, res) => {
        try {
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