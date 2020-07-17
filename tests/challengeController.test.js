const moment = require('moment');
const challengeController = require('../controllers/challengeController');
const currentDate = new Date();

challenge = {
    title: 'Hello World',
    subtitle: 'Subtitle from test',
    slides: 'https://docs.google.com/presentation/d/e/2PACX-1vTurAU8J-EsobqF97kbA_dT_mgdWhZ9broM_iKbiaNELspbSe1UaNkfJRIXwT-zHuFY_o_9NrwZhsaU/embed?start=false&loop=false&delayms=3000',
    text: '<h2>Lorem ipsum dolor sit amet</h2><p>consectetur adipisicing elit.<p> <p>Accusantium autem, qui voluptas officia velit, sequi doloremque perferendis dicta exercitationem itaque non aspernatur dignissimos cum eveniet sint quas voluptatibus magni nisi.</p><p> Mussum Ipsum, cacilds vidis litro abertis.</p><p> Posuere libero varius.</p> <p>Nullam a nisl ut ante blandit hendrerit.</p><p> Aenean sit amet nisi.</p><p> Atirei o pau no gatis, per gatis num morreus.</p><p> Copo furadis é disculpa de bebadis, arcu quam euismod magna.</p><p> Si num tem leite então bota uma pinga aí cumpadi!  Diuretics paradis num copo é motivis de denguis.</p><p> Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</p><p> Casamentiss faiz malandris se pirulitá.</p><p> A ordem dos tratores não altera o pão duris.</p><p> Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.</p><p> Sed non consequat odio.</p><p> Per aumento de cachacis, eu reclamis.</p><p> Nec orci ornare consequat.</p><p> Praesent lacinia ultrices consectetur.</p><p> Sed non ipsum felis.<p>',
    score: 80,
    expiresAt: moment(currentDate).add(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
    xp: 1,
    moduleId: 1,
    statusId: 1
};

test('Deve informar que salvou um novo desafio ', async () => {
    let result = await challengeController.store(challenge);
    challenge.id = result.id;
    expect(result.title).toBe('Hello World');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve informar que o módulo informado não está disponível ', async () => {
    challenge.moduleId = 5;
    challenge.statusId = 1;
    let result = await challengeController.store(challenge);
    expect(result).toBe('O módulo informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve informar que o status informado não está disponível ', async () => {
    challenge.moduleId = 1;
    challenge.statusId = 5;
    let result = await challengeController.store(challenge);
    expect(result).toBe('O status informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o desafio alterado ', async () => {
    challenge.moduleId = 2;
    challenge.statusId = 2;
    challenge.title = 'Título do desafio alterado';
    challenge.subtitle = 'Subtítulo alterado';
    challenge.text = 'Texto alterado para uma fração pequena';
    let result = await challengeController.update(challenge);
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o desafio excluido ', async () => {
    let result = await challengeController.destroy(challenge.id);
    expect(result).toEqual(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o desafio excluido ', async () => {
    let result = await challengeController.destroy('ab');
    expect(result).toEqual('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});


test('Deve retornar mensagem de desafio não encontrado ', async () => {
    challenge.moduleId = 1;
    challenge.statusId = 1;
    challenge.title = 'Título do desafio alterado again?';
    let result = await challengeController.update(challenge.id);
    expect(result).toBe('O status informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve informar que a data de expiração tem que ser maior que a atual ', async () => {
    challenge.expiresAt = moment(currentDate).subtract(3, 'days').format('YYYY-MM-DD hh:mm:ss');
    let result = await challengeController.store(challenge);
    expect(result).toBe('A data de expiração deve ser maior que a data atual');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve listar os desafios para administrador ', async () => {
    let user = { id: 1, admin: 1 };
    let result = await challengeController.index(user);
    expect(result.length).toBeGreaterThan(4);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar um array vazio ', async () => {
    let user = { id: 5, admin: 0 };
    let result = await challengeController.index(user);
    expect(result).toEqual([]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Exibir um desafio ', async () => {
    let result = await challengeController.show(1);
    expect(result.title).toBe('Desafio I');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Exibir uma mensagem de id inválido ', async () => {
    let result = await challengeController.show('a');
    expect(result).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});