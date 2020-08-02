const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bk = require('bcrypt');
const { User } = require('../models');
const conectedUser = { id: 1, admin: false };

module.exports = {
    
    index: async (req, res) => {
        try {

            let { email, name } = req.query;

            (!email) ? email = '' : email;
            (!name) ? name = '' : name;
            const result = await User.findAll({
                where: {
                    [Op.or]: [
                        { email: { [Op.like]:`%${email}%`} },
                        { name:{[Op.like]:`%${name}%`}}
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
    
    
    store: async (req, res) => {
        try {
            
            let { email, password } = req.body;

            const alreadyExistis = await User.findOne({ where: { email } });
            if (alreadyExistis) {
                return res.status(422).json({ error: true, msg: 'Email já cadastrado' });
            }
            email = email.toLowerCase();
            const result = await User.create({ email, password });
            return res.status(200).json({ result });              
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});  
        }
    },
    
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await User.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    update: async (req, res) => {
        const transaction = await User.sequelize.transaction();
        try {
            let encryptedPass;
            const { id } = req.params;
            let { name, avatar, password, linkedin, github, telegram, whatsapp } = req.body;
            if (password) {
                encryptedPass = bk.hashSync(password, 10);
            }
            let result = await User.update({
                name, avatar, encryptedPass, linkedin, github, telegram, whatsapp
            }, { where: { id } });

            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    destroy: async (req, res) => {
        const transaction = await User.sequelize.transaction();
        try {
            
            const { id } = req.params;

            if (!conectedUser.admin) {
                return res.status(422).json({ error: true, msg:'Apenas administrador pode excluir usuário'});
            }
            
            let userExists = await User.findByPk(id);
            
            if (!userExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'O usuário informado não foi encontrado' });
            }
            let result = await userExists.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    login: async (req, res) => {
        try {

            let { email, password } = req.body;

            email = email.toLowerCase();
            const result = await User.scope('withPassword').findOne({ where: { email } });
            if (!result) {
                return res.status(422).json({ error: true, msg: 'Email ou senha inválido' });
            }
            const passMatch = bk.compareSync(password, result.password);
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