const { Challenge, Module, ChallengeStatus, UserModule } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validateChallenge = async (challenge) => {
    let msg;
    try {
        let statusExist = await ChallengeStatus.findByPk(challenge.statusId);
        let moduleExist = await Module.findByPk(challenge.moduleId);
        
        if (!statusExist || !moduleExist) {
            (statusExist) ? msg = 'O módulo informado não está disponível' : msg = 'O status informado não está disponível';
            return res.status(422).json({ error: true, msg});
        }
        
        if (!challenge.slides.includes('/embed?') || !challenge.slides.includes('https://docs')) {
        msg = 'Informe um válido link do google slides';
        return res.status(422).json({ error: true, msg});
        }

        if ((new Date(challenge.expiresAt)) <= (new Date())) {
            msg = 'A data de expiração deve ser maior que a data atual';
            return res.status(422).json({ error: true, msg});
        }
    
    return { status: 200, msg: 'Ok' };
    
} catch (error) {
    return res.status(422).json({ error: true, msg:error.message});
}
};


module.exports = {
    
    store: async (challenge) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            
            const validate = await validateChallenge(challenge);
            
            if (validate.status != 200) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:validate.msg});
            }
            
            let result = await Challenge.create(challenge);
            
            transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            console.log(error);
            transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (challenge) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            const validate = await validateChallenge(challenge);
            
            if (validate.status != 200) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:validate.msg});
            }
            
            const challengeExist = await Challenge.findByPk(challenge.id);
            
            if (!challengeExist) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não encontrei o desafio informado'});
            }
            
            const result = await Challenge.update(challenge, { where: { id: challenge.id } });
            return res.status(200).json({ result });
            
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    

    destroy: async (id) => {
        const transaction = await Challenge.sequelize.transaction();
        try {
            if (isNaN(id)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'Informe um id válido'});
            }
            const challengeExist = await Challenge.findByPk(id);
            
            if (!challengeExist) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg:'Não encontrei o desafio informado'});
            }
            
            const result = await Challenge.destroy({ where: { id } });
            transaction.commit();
            return res.status(200).json({ result });
            
        } catch (error) {
            transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    index: async (conectedUser, status = 1, page = 1, limit = 14) => {
        try {

            limit = parseInt(limit);
            page = parseInt(page - 1);

            if (isNaN(limit) || isNaN(page)) {
                return [];
            }

            if (conectedUser.admin) {
                let { count: size, rows: result } = await Challenge.findAndCountAll({
                    where: { statusId: status },
                    limit,
                    offset: limit * page
                });
                return res.status(200).json({ size, result });
            }

            const userModules = await UserModule.findAll({
                where: {
                    userId: conectedUser.id
                }
            });

            if (!userModules) {
                return [];
            }

            const modules = userModules.map((elem) => elem.moduleId);

            let { count: size, rows: result } = await Challenge.findAndCountAll({
                where: {
                    statusId: 1,
                    moduleId: {
                        [Op.in]: modules
                    }
                },
                limit,
                offset: limit * page
            });

            return res.status(200).json({ size, result });

        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    show: async (id) => {
        try {

            if (isNaN(id)) {
                return 'Informe um id válido';
            }

            const result = await Challenge.findByPk(id);
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};

