const classController = require('../controllers/classController');

test('Deve listar as aulas de um módulo 1 ', async () => {
    const aulas = await classController.index(1);
    expect(aulas.size).toBe(4);
});

test('Deve listar as aulas de um módulo 2 ', async () => {
    const aulas = await classController.index(2);
    expect(aulas.size).toBe(3);
});

test('Deve exibir a aula 01 ', async () => {
    const aula = await classController.show(1);
    expect(aula.id).toBe(1);
});