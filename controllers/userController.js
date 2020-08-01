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
            const result = await User.findAll({
                where: {
                    [Op.or]: [
                        { email: { [Op.like]:`%${user.email}%`} },
                        { name:{[Op.like]:`%${user.name}%`}}
                    ]
                },
                limit:7
            });
            return res.status(200).json({ result });   
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    store: async (user) => {
        try {
            if (!user.email || !user.password) {
            return res.status(422).json({ error: true, msg:'Informe, email e senha'});

            }
            if (!(validator.isEmail(user.email))) {
                return res.status(422).json({ error: true, msg: 'Email inválido' });
            }
            const alreadyExistis = await User.findOne({ where: { email: user.email } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg: 'Email já cadastrado' });
            }
            user.email = user.email.toLowerCase();
            const result = await User.create(user);
            return res.status(200).json({ result });              
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});  
        }
    },
    
    
    show: async (user) => {
        try {
            if (!user.email) {
                return res.status(422).json({ error: true, msg: 'Informe um email' });
            }
            if(!(validator.isEmail(user.email))){
                return res.status(422).json({ error: true, msg: 'Email inválido' });
            }
            user.email = user.email.toLowerCase();
            const result = await User.findOne({ where: { email: user.email } });
            if (!result) {
                return res.status(422).json({ error: true, msg: 'Email inválido' });
            }
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (user) => {
        const transaction = await User.sequelize.transaction();
        try {
            if (!user) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Informe um usuário' });
            }
            if (!user.id) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Informe um usuário' });
            }
            let result = await User.update(user, {where:{id:user.id}});
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    destroy: async (id) => {
        const transaction = await User.sequelize.transaction();
        try {
            if (!id) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Informe um id' });

            }
            
            if (isNaN(id)) {
                transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Informe um id válido' });
            }
            
            let userExists = await User.findByPk(id);
            
            if (!userExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'O usuário já foi excluido' });
            }
            let result = await User.destroy({ where: { id } });
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    login: async (user) => {
        try {
            if (!user.email) {
                return res.status(422).json({ error: true, msg: 'Informe um email' });
            }
            if (!user.password) {
                return res.status(422).json({ error: true, msg: 'Informe sua senha' });
            }
            if(!(validator.isEmail(user.email))){
                return res.status(422).json({ error: true, msg: 'Email inválido' });
            }
            user.email = user.email.toLowerCase();
            const result = await User.scope('withPassword').findOne({ where: { email: user.email } });
            if (!result) {
                return res.status(422).json({ error: true, msg: 'Email ou senha inválido' });
            }
            const passMatch = bk.compareSync(user.password, result.password);
            if (!passMatch) {
                return res.status(422).json({ error: true, msg: 'Email ou senha inválido' });
            }
            return res.status(200).json({ conected:true });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});            
        }
    },
};