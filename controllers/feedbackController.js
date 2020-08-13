const { Feedback, TeamUser, Challenge, Team, User, FeedbackStatus } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 6, admin: true };
const minCoinsToFeedback = { admin:0, user:1};
const statusToFeedback = [2, 3];
const { validationResult } = require('express-validator');

module.exports = {
    
    store: async (req, res) => {
        const transaction = await Team.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let userId = connectedUser.id;
            const { teamId } = req.params;
            const { comment = '', score = 0, statusId = 0 } = req.body;
            const status = (statusId == 0) ? 4 : 3;
            let minCoins;
            minCoins = (connectedUser.admin) ? minCoinsToFeedback.admin : minCoinsToFeedback.user;
            
            const alreadyFeedback = await Feedback.findOne({
                where: {
                    userId,
                    teamId
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
                        id:teamId
                    }
                });

                if (!validTeam) {
                    await transaction.rollback();
                    return res.status(422).json({ error: true, msg:'Não foi encontrado o time do desafio'});
                }
                
                const promises = validTeam.members.map((user) => {
                    let _score = parseInt(user.score) + parseInt(score);
                    return new Promise((resolve, reject) => {
                        resolve(User.update({ score:_score }, { where: { id: user.id } }));
                    });
                });
                
                await Promise.all(promises);

                alreadyFeedback.comment = comment;
                alreadyFeedback.score = score;
                let result = await alreadyFeedback.save();

                //4 = Status avaliado
                validTeam.statusId = status;
                await validTeam.save();

                await transaction.commit();
                return res.status(200).json({ result });
                
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
                    id:teamId
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
                    score: parseInt(isValidTeam.challenge_team.score) + parseInt(isValidTeam.members[index].score) + parseInt(score),
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
            
            
            const userGiveFeedback = await User.findByPk(userId);
            
            userGiveFeedback.coins += parseInt(minCoinsToFeedback.user) * dataToUpdateProfiles.length;
            await userGiveFeedback.save();
            
            const result = await Feedback.create({comment, score, userId, teamId});
            
            isValidTeam.statusId = status;
            await isValidTeam.save();
            
            await transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
        
    },


    destroy: async (req, res) => {
        const transaction = await Feedback.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const result = await Feedback.findByPk(id);
            result.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    show: async (req, res) => {
        const transaction = await Feedback.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const result = await Feedback.findByPk(id);

            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    index: async (req, res) => {
        try {

            const { teamId='' } = req.query;

            let { limit = 14, page = 1 } = req.body;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const result = await Feedback.findAll({
                where:{teamId:{[Op.like]:`%${teamId}%`}},
                limit,
                offset:limit*page
            });

            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    update: async (req, res) => {
        const transaction = await Feedback.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const userId = connectedUser.id;
            const { id } = req.params;
            const { comment, score } = req.body;
            const feedbackExists = await Feedback.findOne({ where: { id, userId } });
            if (!feedbackExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não foi encontrado o feedback para o id informado'});
            }
            feedbackExists.comment = comment;
            feedbackExists.score = score;
            const result = await feedbackExists.save();
            await transaction.commit();
            return res.status(200).json({ result });

        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};