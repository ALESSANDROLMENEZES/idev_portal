const { AskForHelp, User } = require('../models');
const conectedUser = {id:1};
module.exports = {
    
    store: async (askForHelp) => {
        try {
            if (!askForHelp) {
                return { error: true, status: 422, msg: 'Informe os dados' };
            }
            askForHelp.userId = conectedUser.id;
            const result = await AskForHelp.create(askForHelp);
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    update: async (askForHelp) => {
        try {
            let askForHelpExist = await AskForHelp.findByPk(askForHelp.id);
            if (!askForHelpExist) {
                return { error: true, status: 422, msg: 'Não foi encontrado dados para o id' };
            }
            askForHelpExist.avaliable = askForHelp.avaliable;
            askForHelpExist.title = askForHelp.title;
            askForHelpExist.description = askForHelp.description;
            const result = await askForHelpExist.save();
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    index: async (limit = 7, page=1, avaliable=1) => {
        try {
            limit = parseInt(limit);
            page = parseInt(page) - 1;
            const { rows: result, size: count } = await AskForHelp.findAndCountAll({
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
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    show: async (id) => {
        try {
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
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
        
    destroy: async (id) => {
        try {
            let askForHelpExist = await AskForHelp.findByPk(id);
            if (!askForHelpExist) {
                return { error: true, status: 422, msg: 'Não foi encontrado dados para o id' };
            }
            const result = await askForHelpExist.destroy();
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
};