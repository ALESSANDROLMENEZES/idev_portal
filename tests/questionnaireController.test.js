const questionnaireController = require('../controllers/questionnaireController');

const newQuestionnaire = {
    title: 'Salvando teste',
    classId: 1,
    avaliable:true
};

test('Deve salvar um novo questionário ', async () => {
    const result = await questionnaireController.store(newQuestionnaire);
    expect(result.title).toBe('Salvando teste');
});