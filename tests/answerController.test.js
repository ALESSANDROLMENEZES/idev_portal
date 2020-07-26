const answerController = require('../controllers/answerController');

const answer = {
    description: 'This is the right answer',
    avaliable:true
};

test('Deve salvar uma nova resposta ', async () => {
    const result = await answerController.store(answer);
    answer.id = result.id;
    expect(result.description).toBe('This is the right answer');
});

test('Deve atualizar a descricao da resposta aterior ', async () => {
    answer.description = 'This isnt the right answer';
    const result = await answerController.update(answer);
    expect(result.description).toBe('This isnt the right answer');
});

test('Deve excluir a resposta ', async () => {
    await answerController.destroy(answer.id);
    const exist = await answerController.show(answer.id);
    expect(exist.error).toBe(true);
});

test('Deve listar as respostas ', async () => {
    const list = await answerController.index(10);
    expect(list.length).toBeGreaterThan(3);
});

