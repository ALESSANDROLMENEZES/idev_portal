const moduleController = require('../controllers/moduleController');

let newModule;
test('Deve salvar um novo módulo ', async () => {
    const mod = { title: 'Terminal Git e Github' };
    newModule = await moduleController.store(mod);
    expect(newModule.title).toBe('Terminal Git e Github');
    expect(newModule).not.toBeNull();
    expect(newModule).not.toBeUndefined();
});

test('Deve retornar mensagem de erro ', async () => {
    const mod = { title: 'A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real' };
    const result = await moduleController.store(mod);
    expect(result).toBe('Informe um titulo menor que 80 caracteres');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});


test('Deve retornar apenas os módulos do usuário comun ', async () => {
    const user = { id:1, admin:0};
    const result = await moduleController.index(user);
    expect(result[0].title).toBe('Introdução a javascript');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar solicitando autenticação ', async () => {
    const result = await moduleController.index();
    expect(result).toBe('Você precisa realizar o login');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar um array vazio usuário não possui módulos ', async () => {
    const user = { id:2, admin:0};
    const result = await moduleController.index(user);
    expect(result).toEqual([]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar um array com todos os módulos para o admin ', async () => {
    const user = { id:6, admin:1};
    const result = await moduleController.index(user);
    expect(result.length).toBeGreaterThan(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar uma mensagem pedindo para informar o módulo ', async () => {
    const result = await moduleController.update({});
    expect(result).toBe('Informe um módulo');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar uma mensagem pedindo para informar o módulo ', async () => {
    const result = await moduleController.update();
    expect(result).toBe('Informe um módulo');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o titulo alterado ', async () => {
    const result = await moduleController.update({ id: 1, title: 'Javascript na prática' });
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar voltar o nome do título ao que era antes ', async () => {
    const result = await moduleController.update({ id: 1, title: 'Introdução a javascript' });
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar um módulo ', async () => {
    const result = await moduleController.destroy();
    expect(result).toBe('Informe um id');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar um módulo ', async () => {
    const result = await moduleController.destroy({});
    expect(result).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve excluir o último módulo salvo ', async () => {
    const result = await moduleController.destroy(newModule.id);
    expect(result).toBe(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar mensagem de módulo já excluido ', async () => {
    const result = await moduleController.destroy(newModule.id);
    expect(result).toBe('O módulo já foi excluido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('A exclusão anterior não pode ter excluido todos os módulos ', async () => {
    const user = { id:6, admin:1};
    const result = await moduleController.index(user);
    expect(result.length).toBeGreaterThan(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});
