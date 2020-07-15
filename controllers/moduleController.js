const { Module } = require('../models');
module.exports = {
    store: async (mod) => {
        try {
            if (!mod.title) {
                return 'Informe um titulo';
            }  
            if (mod.title.length > 80) {
                return 'Informe um titulo menor que 80 caracteres';
            }  
            const result = await Module.create(mod);
            return result;
        } catch (error) {
            return 'Ocorreu um erro';
        }
    }
};