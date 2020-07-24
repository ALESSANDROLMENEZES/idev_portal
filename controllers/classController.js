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
    },
    
    
    store: async(_class)=>{
        try {
            let msg;
            if (!_class) {
                return { error: true, msg: 'informe uma classe', status: 422 };
            }
            
            if (!_class.slides.includes('/embed?') || !_class.slides.includes('https://docs')) {
            msg = 'Informe um link válido do google slides com a propriedade: /embed?';
            return { status:422, msg };
            }

            if (!_class.video.includes('/embed') || !_class.video.includes('https://www.youtube')) {
            msg = 'Informe um link válido do youtube com a propriedade: /embed?';
            return { status:422, msg };
            }
        
        const result = await Class.create(_class);
            return result;
            
    } catch (error) {
        console.log(error);
        return { error: true, msg: error.message, status: 422 };
    }
},


update: async (_class) => {
    const transaction = await Class.sequelize.transaction();
    try {
        if (!_class) {
            return { error: true, msg: 'informe uma classe', status: 422 }; 
        }
        
        const foundClass = await Class.findByPk(_class.id);
        if (!foundClass) {
            return { error: true, msg: 'Não foi encontrada uma aula com o id especificado', status: 422 }; 
        }
        
        const result = await Class.update(_class, { where: { id: _class.id } });
        
        await transaction.commit();
        
        return result;
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return { error: true, msg: error.message, status: 422 };
    }
},


destroy: async (id) => {
    const transaction = await Class.sequelize.transaction();
    try {
        const foundClass = await Class.findByPk(id);
        if (!foundClass) {
            return { error: true, msg: 'Não foi encontrada uma aula com o id especificado', status: 422 }; 
        }
        const result = await foundClass.destroy();
        
        await transaction.commit();
        
        return result;
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return { error: true, msg: error.message, status: 422 };  
    }
}


};