const { Feedback, TeamUser, Challenge, Team, User, FeedbackStatus } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 6, admin: true };
const minCoinsToFeedback = { admin:0, user:1};
const statusToFeedback = [2, 3];

let feedback = { teamId: 1, comment: 'Lorem ipsum lo da lor, e setbem ale aser nameise dalaroe', score:7, userId:connectedUser.id, statusId:4 };

module.exports = {

    store: async () => {
        const transaction = await Team.sequelize.transaction();
        try {
            let minCoins;
            (connectedUser.admin) ? minCoins = minCoinsToFeedback.admin : minCoins = minCoinsToFeedback.user;

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
                transaction.rollback();
                return { error: true, status: 422, msg: 'O time não concluiu o desafio ou não possui moedas suficiente' };
            }

          
            const dataToUpdateProfiles = [];

            for (let index = 0; index < isValidTeam.members.length; index++) {
                if (isValidTeam.members[index].id === connectedUser.id) {
                    transaction.rollback();
                    return { error: true, status: 422, msg: 'Outro usuário deve avaliar seu time' }; 
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
            userGiveFeedback.save();

            const result = await Feedback.create({comment:feedback.comment, score:feedback.score, userId:feedback.userId,teamId:feedback.teamId});

            isValidTeam.statusId = feedback.statusId;
            isValidTeam.save();

            transaction.commit();
            return result;

        } catch (error) {
            transaction.rollback();
            console.log(error);
            return { error: true, status: 422, msg: 'Ocorreu um erro' };
        }

    }

};