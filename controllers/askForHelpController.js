const { AskForHelp, User } = require('../models');
const { validationResult } = require('express-validator');
const conectedUser = { id: 1 };
module.exports = {
    
    store: async (req, res) => {
        const transaction = await AskForHelp.sequelize.transaction();
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, avaliable } = req.body;
            const  userId  = conectedUser.id;
            if (!req.body) {
                await transaction.rollback();
                return { error: true, status: 422, msg: 'Informe os dados' };
            }
    
            const result = await AskForHelp.create({ title, description, avaliable, userId });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    update: async (req, res) => {
        const transaction = await AskForHelp.sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const {avaliable, title,description} = req.body;
            let askForHelpExist = await AskForHelp.findByPk(id);

            if (!askForHelpExist) {
                await transaction.rollback();
                return res.status(400).json({ error: true, status: 422, msg: 'Não foi encontrado dados para o id' });
            }
            askForHelpExist.avaliable = avaliable;
            askForHelpExist.title = title;
            askForHelpExist.description = description;
            const result = await askForHelpExist.save();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    index: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { limit = 7, page = 1, avaliable = 1 } = req.query;
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const { rows: result, count:size } = await AskForHelp.findAndCountAll({
                include: [
                    {
                        model: User,
                        as: 'ask_user',
                        required:true
                    }
                ],
                where: { avaliable },
                limit,
                offset:limit*page
            });
            return res.status(200).json({ size, result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    show: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { id } = req.params;
            const result = await AskForHelp.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: 'ask_user',
                        required:true
                    }
                ]
            });
            if (!result) {
                return {};
            }
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
        
    destroy: async (req, res) => {

        const transaction = await AskForHelp.sequelize.transaction();

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let { id } = req.params;
            let askForHelpExist = await AskForHelp.findByPk(id);
            if (!askForHelpExist) {
                await transaction.rollback();
                return res.status(422).json({ error: true, status: 422, msg: 'Não foi encontrado dados para o id' });
            }
            const result = await askForHelpExist.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
};