const questionnaireQuestionController = require('../controllers/questionnaireQuestionController');

const answers = [
    {
        description:'Branco'
    },
    {
        description:'Marron'
    },
    {
        description:'Preto'
    },
    {
        description:'Vermelho'
    },
    {
        description:'Rocho'
    }
];

const question = {
    text: 'Qual é a cor do cavalo de São Jorge?',
    rightAnswer:''
};

test('Deve vincular uma nova questão a um questionário ', async () => {
    
});