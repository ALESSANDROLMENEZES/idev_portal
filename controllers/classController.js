const { Class, Module } = require('../models');


module.exports = {
    
    index: async (moduleId) => {
        try {
            if (!moduleId) {
                return 'Informe o id do módulo';
            }
            const { rows: classes, count: size } = await Class.findAndCountAll({
                include: [
                    {
                        model: Module,
                        as: 'class_module',
                        required: true,
                        where: { id: moduleId }
                    }
                ]
            });
            return { classes, size };
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    show: async (id) => {
        try {
            const result = await Class.findByPk(id, {
                include: [
                    {
                        model: Module,
                        as: 'class_module',
                        required: true
                    }
                ]
            });
            if (!result) {
                return {};
            }
            return result;
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    store: async (_class) => {
        try {
            let msg;
            if (!_class) {
                return res.status(422).json({ error: true, msg:'informe uma classe'});
            }
            
            if (!_class.slides.includes('/embed?') || !_class.slides.includes('https://docs')) {
                msg = 'Informe um link válido do google slides com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
        
            if (!_class.video.includes('/embed') || !_class.video.includes('https://www.youtube')) {
                msg = 'Informe um link válido do youtube com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
    
            const result = await Class.create(_class);
            return result;
    
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    update: async (_class) => {
        const transaction = await Class.sequelize.transaction();
        try {
            if (!_class) {
                return res.status(422).json({ error: true, msg:'informe uma classe'});
            }
        
            const foundClass = await Class.findByPk(_class.id);
            if (!foundClass) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada uma aula com o id especificado'});
            }
        
            if (!_class.slides.includes('/embed?') || !_class.slides.includes('https://docs')) {
                msg = 'Informe um link válido do google slides com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
    
            if (!_class.video.includes('/embed') || !_class.video.includes('https://www.youtube')) {
                msg = 'Informe um link válido do youtube com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }

            const result = await Class.update(_class, { where: { id: _class.id } });

            await transaction.commit();

            return res.status(200).json({ result });

        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    destroy: async (id) => {
        const transaction = await Class.sequelize.transaction();
        try {
            const foundClass = await Class.findByPk(id);
            if (!foundClass) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada uma aula com o id especificado'});
            }
            const result = await foundClass.destroy();
        
            await transaction.commit();
        
            return res.status(200).json({ result });
        
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg: error.message});
        }
    }


};