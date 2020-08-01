const { Class, Module } = require('../models');


module.exports = {
    
    index: async (req, res) => {
        try {
            const { moduleId } = req.params;
            const { rows: result, count: size } = await Class.findAndCountAll({
                include: [
                    {
                        model: Module,
                        as: 'class_module',
                        required: true,
                        where: { id: moduleId }
                    }
                ]
            });
            return res.status(200).json({ size, result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
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
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    
    store: async (req, res) => {
        try {
            let msg;
            const { title, subtitle, resume, text, code, slides, video, score, xp } = req.body;
            let _class = { title, subtitle, resume, text, code, slides, video, score, xp };
            
            if (!slides.includes('/embed?') || !slides.includes('https://docs')) {
                msg = 'Informe um link válido do google slides com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
        
            if (!video.includes('/embed') || !video.includes('https://www.youtube')) {
                msg = 'Informe um link válido do youtube com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
    
            const result = await Class.create(_class);
            return res.status(200).json({ result });
    
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    update: async (req, res) => {
        const transaction = await Class.sequelize.transaction();
        try {
            const { id } = req.params;
            const { title, subtitle, resume, text, code, slides, video, score, xp } = req.body;
            let _class = { title, subtitle, resume, text, code, slides, video, score, xp };
        
            const foundClass = await Class.findByPk(id);
            if (!foundClass) {
                return res.status(422).json({ error: true, msg:'Não foi encontrada uma aula com o id especificado'});
            }
        
            if (!slides.includes('/embed?') || !slides.includes('https://docs')) {
                msg = 'Informe um link válido do google slides com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }
    
            if (!video.includes('/embed') || !video.includes('https://www.youtube')) {
                msg = 'Informe um link válido do youtube com a propriedade: /embed?';
                return res.status(422).json({ error: true, msg});
            }

            const result = await Class.update(_class, { where: { id } });

            await transaction.commit();

            return res.status(200).json({ result });

        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    destroy: async (req, res) => {
        const transaction = await Class.sequelize.transaction();
        try {
            let { id } = req.params;
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