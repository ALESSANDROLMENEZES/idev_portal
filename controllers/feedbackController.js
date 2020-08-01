const { Feedback, TeamUser, Challenge, Team, User, FeedbackStatus } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 6, admin: true };
const minCoinsToFeedback = { admin:0, user:1};
const statusToFeedback = [2, 3];

const validateId = (id) => {
    id = parseInt(id);
    if (isNaN(id)) {
        return { error: true, status: 422, msg: 'Informe um id válido' };
    }
};

module.exports = {
    
    store: async (feedback) => {
        const transaction = await Team.sequelize.transaction();
        try {
            
            let minCoins;
            (connectedUser.admin) ? minCoins = minCoinsToFeedback.admin : minCoins = minCoinsToFeedback.user;
            

            const alreadyFeedback = await Feedback.findOne({
                where: {
                    userId: feedback.userId,
                    teamId: feedback.teamId
                }
            });
            if (alreadyFeedback) {
                const validTeam = await Team.findOne({
                    include: [
                        {
                            model: User,
                            as: 'members',
                            required: true,
                        },
                        {
                            model: Challenge,
                            as: 'challenge_team',
                            required: true,
                            attributes: ['score', 'xp']
                        },
                        {
                            model: FeedbackStatus,
                            as: 'feedback_status',
                            required: true,
                        },
                    ],
                    where: {
                        statusId: {
                            [Op.in]: statusToFeedback
                        },
                        id:feedback.teamId
                    }
                });

                if (!validTeam) {
                    await transaction.rollback();
                    return res.status(422).json({ error: true, msg:'Não foi encontrado o time do desafio'});
                }
                
                const promises = validTeam.members.map((user) => {
                    let score = parseInt(user.score) + parseInt(feedback.score);
                    return new Promise((resolve, reject) => {
                        resolve(User.update({ score }, { where: { id: user.id } }));
                    });
                });
                
                await Promise.all(promises);

                alreadyFeedback.comment = feedback.comment;
                alreadyFeedback.score = feedback.score;
                let result = await alreadyFeedback.save();

                validTeam.statusId = feedback.statusId;
                await validTeam.save();

                await transaction.commit();
                return result;
                
            }



            
            const isValidTeam = await Team.findOne({
                include: [
                    {
                        model: User,
                        as: 'members',
                        required: true,
                        where: {
                            coins: {
                                [Op.gte]: minCoins
                            }
                        }
                    },
                    {
                        model: Challenge,
                        as: 'challenge_team',
                        required: true,
                        attributes: ['score', 'xp']
                    },
                    {
                        model: FeedbackStatus,
                        as: 'feedback_status',
                        required: true,
                    },
                ],
                where: {
                    statusId: {
                        [Op.in]: statusToFeedback
                    },
                    id:feedback.teamId
                }
            });
            
            if (!isValidTeam) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O time não concluiu o desafio ou não possui moedas suficiente'});
            }
            
            
            const dataToUpdateProfiles = [];
            
            for (let index = 0; index < isValidTeam.members.length; index++) {
                if (isValidTeam.members[index].id === connectedUser.id) {
                    await transaction.rollback();
                    return res.status(422).json({ error: true, msg:'Outro usuário deve avaliar seu time'});
                }
                dataToUpdateProfiles.push({
                    id:isValidTeam.members[index].id,
                    score: parseInt(isValidTeam.challenge_team.score) + parseInt(isValidTeam.members[index].score) + parseInt(feedback.score),
                    xp: parseInt(isValidTeam.challenge_team.xp) + parseInt(isValidTeam.members[index].xp),
                    coins:parseInt(isValidTeam.members[index].coins) - parseInt(minCoinsToFeedback.user)
                });
            }
            
            const promises = dataToUpdateProfiles.map((user) => {
                return new Promise((resolve, reject) => {
                    resolve(User.update({ score: user.score, xp: user.xp, coins: user.coins }, { where: { id: user.id } }));
                });
            });
            
            await Promise.all(promises);
            
            
            const userGiveFeedback = await User.findByPk(connectedUser.id);
            
            userGiveFeedback.coins += parseInt(minCoinsToFeedback.user) * dataToUpdateProfiles.length;
            await userGiveFeedback.save();
            
            const result = await Feedback.create({comment:feedback.comment, score:feedback.score, userId:feedback.userId,teamId:feedback.teamId});
            
            isValidTeam.statusId = feedback.statusId;
            await isValidTeam.save();
            
            await transaction.commit();
            return result;
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
        
    },


    destroy: async (id) => {
        const transaction = await Feedback.sequelize.transaction();
        try {
            validateId(id);
            const result = await Feedback.findByPk(id);
            result.destroy();
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    show: async (id) => {
        const transaction = await Feedback.sequelize.transaction();
        try {
            validateId(id);
            const result = await Feedback.findByPk(id);
            if (!result) {
                return {};
            }
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    index: async (limit=14, page=1, statusId=2) => {
        try {
            const result = await Feedback.findAll({
                limit
            });
            if (!result) {
                return [];
            }
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};