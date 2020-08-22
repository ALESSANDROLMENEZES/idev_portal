const { check, param } = require('express-validator');

module.exports = {

    validateIdParam: () => {
        return [

            param('id', 'Informe o id em formato numérico').isNumeric()

        ];
    },

    validateChallenge: () => {
        return [

            check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
            check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
            check('slides', 'Informe um link do google slides de até 255 caracter').isLength({min:1,max:255}),
            check('text', 'Informe o texto explicativo').isLength({min:1}),
            check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
            check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
            check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
            check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),

        ];
    },

    validateStatus: () => {
        return [

            check('description', 'Informe uma descrição de até 45 caracter').isLength({min:1, max:45}),

        ];
    },

    validateModuleId: () => {
        return [
            param('moduleId', 'Informe o id numérico de um módulo').isNumeric()
        ];
    },

    validateClasses: () => {
        return [

            check('title','Informe um título para a aula').isLength({min:1, max:80}),
            check('subtitle','Informe um subtítulo para a aula').isLength({min:1, max:80}),
            check('slides','Informe um link para slides menor que 255 caracteres').isLength({max:255}),
            check('video','Informe um link para video menor que 255 caracteres').isLength({min:1, max:255}),
            check('score','Informe um score numérico para a aula').isNumeric(),
            check('xp','Informe um xp numérico para a aula').isNumeric(),

        ];
    }

};