const { UserClassDone, Class, ModuleClass, Module } = require('../models');

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
            if (!classExist) {
                return { error: true, msg:'Esta aula não está mais disponível', status: 422 }; 
            }

            const qtdClassesInModule = await ModuleClass.count({
                where: {
                    moduleId: classExist.class_module.moduleId
                }
            });
                
            const qtdClassesUserAttended = await UserClassDone.count();
            const percent = ((qtdClassesInModule / qtdClassesUserAttended) * 100).toFixed(2);
            UserClassDone.percentDone = percent;
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