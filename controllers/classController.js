const { Class, Module, ModuleClass } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    
    index: async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
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
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
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
        const transaction = await Module.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }
            
            let msg;
            let { moduleId } = req.params;
            const { title, subtitle, resume, text, code, slides, video, score, xp } = req.body;
            
            if (!slides.includes('/embed?') || !slides.includes('https://docs')) {
            msg = 'Informe um link válido do google slides com a propriedade: /embed?';
            await transaction.rollback();
            return res.status(422).json({ error: true, msg});
        }
        
        if (!video.includes('/embed') || !video.includes('youtube')) {
            msg = 'Informe um link válido do youtube com a propriedade: /embed?';
            await transaction.rollback();
            return res.status(422).json({ error: true, msg});
        }
        
        const moduleExist = await Module.findByPk(moduleId);
        
        if (!moduleExist) {
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Não foi encontrado um módulo com o id informado'});
        }
        
        const savedClass = await Class.create({ title, subtitle, resume, text, code, slides, video, score, xp });
        
        const result = await ModuleClass.create({ moduleId, classId: savedClass.id });
        
        await transaction.commit();
        return res.status(200).json({ result, savedClass });
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(422).json({ error: true, msg:error.message});
    }
},


update: async (req, res) => {
    const transaction = await Class.sequelize.transaction();
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await transaction.rollback();
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.params;
        const { title, subtitle, resume, text, code, slides, video, score, xp } = req.body;
        
        const foundClass = await Class.findByPk(id);
        if (!foundClass) {
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:'Não foi encontrada uma aula com o id especificado'});
        }
        
        if (!slides.includes('/embed?') || !slides.includes('https://docs')) {
        msg = 'Informe um link válido do google slides com a propriedade: /embed?';
        await transaction.rollback();
        return res.status(422).json({ error: true, msg});
    }
    
    if (!video.includes('/embed') || !video.includes('youtube')) {
        msg = 'Informe um link válido do youtube com a propriedade: /embed?';
        await transaction.rollback();
        return res.status(422).json({ error: true, msg});
    }
    
    const result = await Class.update({ title, subtitle, resume, text, code, slides, video, score, xp } , { where: { id } });
    
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
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await transaction.rollback();
            return res.status(400).json({ errors: errors.array() });
        }
        
        let { id } = req.params;
        const foundClass = await Class.findByPk(id);
        if (!foundClass) {
            await transaction.rollback();
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