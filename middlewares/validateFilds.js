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
    },
    
    validateTemIdParam: () => {
        return [
            
            check('teamId', 'Informe o id numérico do time').isNumeric(),
            
        ];
    },
    
    validateNewFeedback: () => {
        return [
            
            check('score', 'Score é campo obrigatório, se for avaliar mais tarde informe a nota 0').isNumeric(),
            check('statusId', 'Informe o statusId, valor 0 ou 1, sendo 0 se for finalizar a avaliação e 1 se for continuar avaliando mais tarde').isNumeric(),
            
        ];
    },

    validateUpdateFeedback: () => {
        return [
            check('score', 'Score é um campo obrigatório').isNumeric(),
            check('comment', 'Comentário é um campo obrigatório').isLength({ min: 5, max: 500 })
        ];
    },

    validateEmailAndPassword: () => {
        return [

            check('email','Informe um email válido').isEmail(),
            check('password','Informe uma senha').isLength({min:1})

        ];
    },

    validateNewModule: () => {
        return [

            check('title', 'Informe um título para o módulo de até 80 caracteres').isLength({ min: 1, max: 80 }),
            check('avaliable', 'Informe se o módulo ficará disponível').isBoolean(),

        ];
    },

    validateAddModuleToUser: () => {
        return [

            check('userId','Informe um id numérico para o usuário').isNumeric(),
            check('moduleId','Informe um id numérico para o módulo').isNumeric(),

        ];
    },

    validateRemoveModuleToUser: () => {
        return [

            param('userId','Informe um id numérico para o usuário').isNumeric(),
            param('moduleId','Informe um id numérico para o módulo').isNumeric(),

        ];
    },

    validateGetQuestionnaire: () => {
        return [
            param('classId', 'Informe o id da aula para listar o questionário').isNumeric(),
            param('questionId', 'Informe o id da questão').isNumeric(),
        ];
    },

    validateQuestionnaire: () => {
        return [
            check('classId', 'Informe o id da aula').isNumeric(),
            check('title', 'Informe um título de até 45 caracter').isLength({ min: 1, max: 45 }),
            check('avaliable', 'Informe um boleano com o valor true se a aula ficará disponível ou false').isBoolean()
        ];
    },

    validateAnswer: () => {
        return [
            check('description', 'Informe uma descrição para a resposta').isLength({ min: 1, max: 255 }),
            check('avaliable', 'Informe se a resposta ficará disponível').isBoolean()
        ];
    },

    validateQuestionidParam: () => {
        return [
            param('questionId', 'Informe um id numérico para a questão').isNumeric(),
        ];
    },

    validateNewTeam: () => {
        return [
            check('challengeId', 'Informe um id do desafio').isNumeric(),
            check('statusId', 'Informe um id do status de feedback').isNumeric()
        ];
    },

    validateUpdateTeam: () => {
        return [

            check('challengeId', 'Informe um id do desafio').isNumeric(),
            check('github', 'Informe o link do desafio').isURL(),
            check('statusId', 'Informe um id do status de feedback').isNumeric()

        ];
    },

    validateAddMemberOnTeam: () => {
        return [
            check('teamId', 'Informe o id do time ou 0 para ser criado um novo time').isNumeric(),
            check('userId', 'Informe um id do usuário a ser adicionado no time').isNumeric(),
            check('challengeId', 'Informe o id do desafio').isNumeric()
        ];
    },

    validateRemoveUserFromTeam: () => {
        return [
            param('teamId', 'Informe o id do time ou 0 para ser criado um novo time').isNumeric(),
            param('userId', 'Informe um id do usuário a ser adicionado no time').isNumeric()
        ];
    },

    validateHelps: () => {
        return [
            check('title', 'Informe um título que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
            check('description', 'Informe uma descrição que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 })
        ];
    },

    validateAvaliableHelps: () => {
        return [
            check('avaliable', 'Informe um boleano para indicar se o pedido está em aberto').isBoolean()
        ];
    }
    
};