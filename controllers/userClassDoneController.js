const { UserClassDone, Class, ModuleClass, Module } = require('../models');
const connectedUser = { id: 1 };

module.exports = {
    
    store: async (userClassDone) => {
        const transaction = await UserClassDone.sequelize.transaction();
        try {

            if (!userClassDone) {
                return { error: true, msg:'Informe os valores a serem salvos', status: 422 }; 
            }

            const classExist = await Class.findByPk(userClassDone.classId, {
                include:[{model:Module, as:'class_module', required:true}]
            });

            console.log('---------------------------------------------');
            console.log(classExist.class_module[0]);

            if (!classExist) {
                return { error: true, msg:'Esta aula não está mais disponível', status: 422 }; 
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

            console .log(totalClassesInModule)
            console.log(totalClassesUserAttended)
            console.log(percent);

            userClassDone.percentDone = percent;
            userClassDone.userId = connectedUser.id;
            const result = await UserClassDone.create(userClassDone);
            await transaction.commit();
            return result;

        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, msg: error.message, status: 422 };
        }
    }
    
};