const { ModuleClass, Class, Module } = require('../models');

const validateData = async moduleClass => {
    if (!moduleClass) {
        return { error: true, msg:'Informe um modulo a ser salvo'};
    }   

    const classExists = await Class.findByPk(moduleClass.classId);
    if (!classExists) {
        return { error: true, msg:'A aula não existe'};
    }
    const moduleExists = await Module.findByPk(moduleClass.moduleId);

    if (!moduleExists) {
        return { error: true, msg:'A modulo não existe'};
    }

    return {classExists, moduleExists};
};

module.exports = {

    store: async (req, res) => {
        const transaction = await ModuleClass.sequelize.transaction();
        try {
            let { moduleId, classId } = req.body;
            const invalid = await validateData({ moduleId, classId });
            if (invalid.classExists && invalid.moduleExists) {
                const result = await ModuleClass.create({ moduleId, classId });
                await transaction.commit();
                return res.status(200).json({ result });
            }
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return { error: true, msg: error.message, status: 422 };
        }
    },

    destroy: async (req, res) => {
        const transaction = await ModuleClass.sequelize.transaction();
        try {
            let { moduleId, classId } = req.params;
            const moduleClassExist = await ModuleClass.findOne({where:{ moduleId, classId }});
            if (!moduleClassExist) {
                return res.status(422).json({ error: true, msg: 'Não foi encontrado o modulo classe para o id informado' });  
            }
            const result = await moduleClassExist.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message, status: 422 });  
        }
    }

};