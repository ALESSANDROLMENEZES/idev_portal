const { UserClassDone, Class, ModuleClass, Module, User } = require('../models');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');
const Op = Sequelize.Op;
const connectedUser = { id: 1 };


//Método não exportado (util)
const list = async (id, limit, page) => {
    try {
        const { count:size, rows:result } = await UserClassDone.findAndCountAll(
            {
                include: [
                    {
                        model: User,
                        as: 'user_classdone',
                        required: true,
                        attributes: {exclude: ['admin', 'active','password','createdAt','updatedAt']},
                        where:{active:true}
                    },
                    {
                        model: Class,
                        as: 'class_done',
                        required: true,
                        attributes:['id', 'title', 'subtitle', 'xp', 'score'],
                        include: [
                            {
                                model: Module,
                                as: 'class_module',
                                required: true,
                                attributes:['id', 'title'],
                            }
                        ]
                    }
                ],
                where: {
                    userId: { [Op.like]:`%${id}%` }
                },
                limit,
                offset: limit * page
            });
            
            return {size, result };
            
        } catch (error) {
            console.log(error);
            return { error: true, msg:error.message};
        }  
    };
    
    
    
    module.exports = {
        
        store: async (req, res) => {
            const transaction = await UserClassDone.sequelize.transaction();
            try {
                
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                
                let { classId, percentDone } = req.body;
                const userId = connectedUser.id;
                
                const classExist = await Class.findByPk(classId, {
                    include:[{model:Module, as:'class_module', required:true}]
                });
                
                if (!classExist) {
                    return res.status(422).json({ error: true, msg:'Esta aula não está mais disponível'});
                }
                
                const totalClassesInModule = await ModuleClass.count({
                    where: { moduleId: classExist.class_module[0].id }
                });
                
                const totalClassesUserAttended = await UserClassDone.count({
                    include: [
                        {
                            model: Class,
                            as: 'class_done',
                            required: true,
                            include: [
                                {
                                    model: Module,
                                    as: 'class_module',
                                    required:true,
                                    where:{id:classExist.class_module[0].id},
                                },
                            ]
                        }
                    ],
                    where: { userId}
                });
                
                const percent = (((totalClassesUserAttended + 1) / totalClassesInModule) * 100).toFixed(2);
                
                percentDone = percent;
                
                const result = await UserClassDone.create({ classId, percentDone, userId });
                await transaction.commit();
                return res.status(200).json({ result });
                
            } catch (error) {
                await transaction.rollback();
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message});
            }
        },
        
        update: async (req, res) => {
            const transaction = await UserClassDone.sequelize.transaction();
            try {
                
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                
                const { id } = req.params;
                
                const post = await UserClassDone.findByPk(id);
                post.likes++;
                const result = await post.save();
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
                
                let result;
                let { id, listBy='all', limit = 14, page = 1 } = req.query;
                limit = parseInt(limit);
                page = parseInt(page) - 1;
                
                switch (listBy) {
                    case 'my':
                    id = connectedUser.id;
                    result = await list(id, limit, page);
                    return res.status(200).json( result );
                    
                    case 'all':
                    id = '';
                    result = await list(id, limit, page);
                    return res.status(200).json( result );
                    
                    case 'user':
                    if (!id) {
                        return res.status(422).json({ error: true, msg:'Informe o id do usuário'});
                    }
                    result = await list(id, limit, page);
                    return res.status(200).json( result );
                    
                    default:
                    id = '';
                    result = await list(id, limit, page);
                    return res.status(200).json( result );
                }
                
                
            }  catch (error) {
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message});  
            }      
        }
        
    };