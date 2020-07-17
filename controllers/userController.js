const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bk = require('bcrypt');
const { User } = require('../models');
const validator = require('validator');

module.exports = {

    index: async (user) => {
        try {
            (!user.email) ? user.email = '' : user.email;
            (!user.name) ? user.name = '' : user.name;
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { email: { [Op.like]:`%${user.email}%`} },
                        { name:{[Op.like]:`%${user.name}%`}}
                    ]
                },
                limit:7
            });
            return users;   
        } catch (error) {
            return [];
        }
    },
    

    store: async (user) => {
        try {
            if (!user.email || !user.password) {
                return 'Informe, email e senha';
            }
            if (!(validator.isEmail(user.email))) {
                return 'Email inválido'; 
            }
            const alreadyExistis = await User.findOne({ where: { email: user.email } });
            if (alreadyExistis) {
                return 'Email já cadastrado'; 
            }
            user.email = user.email.toLowerCase();
            const result = await User.create(user);
            return result;               
        } catch (error) {
            return 'Ocorreu um erro';   
        }
    },
    

    show: async (user) => {
        if (!user.email) {
            return 'Informe um email';
        }
        if (!user.password) {
            return 'Informe sua senha';
        }
        if(!(validator.isEmail(user.email))){
            return 'Email inválido';
        }
        user.email = user.email.toLowerCase();
        const result = await User.findOne({ where: { email: user.email } });
        if (!result) {
            return 'Email ou senha inválido';
        }
        const passMatch = bk.compareSync(user.password, result.password);
        if (!passMatch) {
            return 'Email ou senha inválido';
        }
        return result;
    },


    update: async (user) => {
        const transaction = await User.sequelize.transaction();
        try {
            if (!user) {
                await transaction.rollback();
                return 'Informe um usuário';
            }
            if (!user.id) {
                await transaction.rollback();
                return 'Informe um usuário';
            }
            let result = await User.update(user, {where:{id:user.id}});
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return 'Ocorreu um erro';
        }
    },

    
    destroy: async (id) => {
        const transaction = await User.sequelize.transaction();
        try {
            if (!id) {
                await transaction.rollback();
                return 'Informe um usuário'; 
            }
            
            if (isNaN(id)) {
                transaction.rollback();
                return 'Não encontrei o usuário';
            }
            
            let userExists = await User.findByPk(id);

            if (!userExists) {
                await transaction.rollback();
                return 'O usuário já foi excluido'; 
            }
            let result = await User.destroy({ where: { id } });
            await transaction.commit();
            return result;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return 'Ocorreu um erro';
        }
    }
};