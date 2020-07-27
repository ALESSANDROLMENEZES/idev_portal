const questionnaireController = require('../controllers/questionnaireController');

const newQuestionnaire = {
    title: 'Salvando teste',
    classId: 1,
    avaliable:true
};

const questionnaire = {
    classId: 2,
    title: 'Questionário de fixação',
    avaliable:true
};

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
    text: 'Qual é a cor do cavalor de São Jorge?'
};

test('Deve salvar um novo questionário ', async () => {
    const result = await questionnaireController.store(newQuestionnaire);
    newQuestionnaire.id = result.id;
    expect(result.title).toBe('Salvando teste');
});

test('Deve atualizar o questionário que foi salvo anteriormente ', async () => {
    newQuestionnaire.title = 'Titulo atualizado';
    const result = await questionnaireController.update(newQuestionnaire);
    expect(result.title).toBe('Titulo atualizado');
});


test('Deve salvar um novo questionário ', async () => {
    const result = await questionnaireController.storeAnswersAndLinkAllToQuestionAndQuestionnaire(
        answers, question, questionnaire, 0
    );
    expect(result.questionId).toBeGreaterThan(5);
});