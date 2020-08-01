const { UserClassDone, Class, ModuleClass, Module, User } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const connectedUser = { id: 1 };



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
            
            return { result, size };
            
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    };
    
    
    
    module.exports = {
        
        store: async (userClassDone) => {
            const transaction = await UserClassDone.sequelize.transaction();
            try {
                
                if (!userClassDone) {
                    return res.status(422).json({ error: true, msg:'Informe os valores a serem salvos'});
                }
                
                const classExist = await Class.findByPk(userClassDone.classId, {
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
                    where: { userId:connectedUser.id}
                });
                
                const percent = (((totalClassesUserAttended + 1) / totalClassesInModule) * 100).toFixed(2);
                
                userClassDone.percentDone = percent;
                userClassDone.userId = connectedUser.id;
                const result = await UserClassDone.create(userClassDone);
                await transaction.commit();
                return result;
                
            } catch (error) {
                await transaction.rollback();
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message});
            }
        },
        
        update: async (id) => {
            const transaction = await UserClassDone.sequelize.transaction();
            try {
                const post = await UserClassDone.findByPk(id);
                post.likes++;
                const result = await post.save();
                transaction.commit();
                return result;
            } catch (error) {
                await transaction.rollback();
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message}); 
            }
        },
        
        index: async (param, id, limit = 14, page = 1) => {
            try {
                let result;
                limit = parseInt(limit);
                page = parseInt(page - 1);
                
                switch (param) {
                    case 'my':
                    id = connectedUser.id;
                    result = await list(id, limit, page);
                    return result;
                    
                    case 'all':
                    id = '';
                    result = await list(id, limit, page);
                    return result;
                    
                    case 'user':
                    if (!id) {
                        return res.status(422).json({ error: true, msg:'Informe o id do usuário'});
                        
                    }
                    result = await list(id, limit, page);
                    return result;
                    
                    default:
                    id = '';
                    result = await list(id, limit, page);
                    return result;
                }
                
                
            }  catch (error) {
                await transaction.rollback();
                console.log(error);
                return res.status(422).json({ error: true, msg:error.message});  
            }      
        }
        
    };