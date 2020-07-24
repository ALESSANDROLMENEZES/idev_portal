const classController = require('../controllers/classController');
const faker = require('faker');
const _class = {
    title: faker.lorem.words(2),
    subtitle: faker.lorem.words(4),
    resume: faker.lorem.text(1),
    text: faker.lorem.text(3),
    code: "$ git add .",
    slides: 'https://docs.google.com/presentation/d/1d7rQskCam024XxbbNSSDg9PBjBGsUcFGHqJrx1MrvhE/embed?slide=id.g8c9e5e0351_0_0',
    video: 'https://www.youtube.com/embed/xR8Z3cVNfRs',
    score: 10,
    xp: 1
};

const wrong_class = {
    title: faker.lorem.words(2),
    subtitle: faker.lorem.words(4),
    resume: faker.lorem.text(1),
    text: faker.lorem.text(3),
    code: "$ git add .",
    slides: 'https://docs.google.com/presentation/d/1d7rQskCam024XxbbNSSDg9PBjBGsUcFGHqJrx1MrvhE/slide=id.g8c9e5e0351_0_0',
    video: 'https://www.youtube.com/xR8Z3cVNfRs',
    score: 10,
    xp: 1
};

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

test('Deve retornar mensagem de link incorreto ', async () => {
    const result = await classController.store(wrong_class);
    expect(result.msg).toBe('Informe um link válido do google slides com a propriedade: /embed?');
});

test('Deve salvar uma nova aula ', async () => {
    const result = await classController.store(_class);
    expect(result.id).toBeGreaterThan(7);
});