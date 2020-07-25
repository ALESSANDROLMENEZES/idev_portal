const { ModuleClass, Class, Module } = require('../models');

const validateData = async moduleClass => {
    if (!moduleClass) {
        return { error: true, msg: 'Informe um modulo a ser salvo', status: 422 };
    }   

    const classExists = await Class.findByPk(moduleClass.classId);
    if (!classExists) {
        return { error: true, msg: 'A aula não existe', status: 422 };
    }
    const moduleExists = await Module.findByPk(moduleClass.moduleId);

    if (!moduleExists) {
        return { error: true, msg: 'A modulo não existe', status: 422 };
    }

    return {classExists, moduleExists};
};

module.exports = {

    store: async (moduleClass) => {
        try {
            const invalid = await validateData(moduleClass);
            if (invalid.error) {
                return invalid;
            }
            const result = await ModuleClass.create(moduleClass);

            return result;

        } catch (error) {
            console.log(error);
            return { error: true, msg: error.message, status: 422 };
        }
    },

    destroy: async (id)=>{
        try {
            const moduleClassExist = await ModuleClass.findByPk(id);
            const result = await moduleClassExist.destroy();
            return result;
        } catch (error) {
            console.log(error);
            return { error: true, msg: error.message, status: 422 };  
        }
    }

};