const { Class, Module } = require('../models');


module.exports = {
    
    index: async (moduleId) => {
        try {
            if (!moduleId) {
                return 'Informe o id do módulo';
            }
            const { rows:classes, count:size } = await Class.findAndCountAll({
                include: [
                    {
                        model: Module,
                        as: 'class_module',
                        required: true,
                        where:{id:moduleId}
                    }
                ]
            });
            return { classes, size };
        } catch (error) {
            console.log(error);
            return { error: true, msg: error.message, status: 422 };
        }      
    },

    show: async (id) => {
        try {
            const result = await Class.findByPk(id,{
                include: [
                    {
                        model: Module,
                        as: 'class_module',
                        required: true
                    }
                ]
            });
            return result;
        } catch (error) {
            console.log(error);
            return { error: true, msg: error.message, status: 422 };
        }
    }
};