const { User } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bk = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
    
    index: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { email, name } = req.query;
            const operationFilter = [];
            const filterByEmail = (!email) ? { email: { [Op.like]:`%%`} } : { email: { [Op.like]:`%${email}%`} };
            const filterByName = (!name) ? { name: { [Op.like]: `%%` } } : { name: { [Op.like]: `%${name}%` } };
            if (!name) {
                operationFilter.push(filterByEmail);
            } else {
                operationFilter.push(filterByName);
            }
            const result = await User.findAll({
                where: {
                    [Op.or]: operationFilter
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
        const transaction = await User.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let { email, password } = req.body;

            const alreadyExistis = await User.findOne({ where: { email } });
            if (alreadyExistis) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Email já cadastrado' });
            }
            email = email.toLowerCase();

            const encryptedPass = bk.hashSync(password, 10);

            const result = await User.create({ email, password:encryptedPass });
            result.password = undefined;
            await transaction.commit();
            return res.status(200).json({ result });              
        } catch (error) {
            await transaction.rollback();
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

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let encryptedPass;
            const { id } = req.params;
            let { email, name, avatar, password, linkedin, github, telegram, whatsapp } = req.body;
            if (password) {
                encryptedPass = bk.hashSync(password, 10);
            }
            let result = await User.update({
                email, name, avatar, password:encryptedPass, linkedin, github, telegram, whatsapp
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
            

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            let { email, password } = req.body;

            email = email.toLowerCase();

            const credentials = await User.scope('withPassword').findOne({ where: { email } });
            if (!credentials) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Email ou senha inválido' });
            }
            const passMatch = bk.compareSync(password, credentials.password);
            if (!passMatch) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg: 'Email ou senha inválido' });
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

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

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