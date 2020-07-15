const moduleController = require('../controllers/moduleController');
const {Module} = require('../models');

//beforeAll(async() => await User.sequelize.close());
afterAll(async () => await Module.sequelize.close());


test('Deve salvar um novo módulo ', async () => {
    const mod = { title: 'Terminal Git e Github' };
    const result = await moduleController.store(mod);
    expect(result.title).toBe('Terminal Git e Github');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar mensagem de erro ', async () => {
    const mod = { title: 'A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real' };
    const result = await moduleController.store(mod);
    expect(result).toBe('Informe um titulo menor que 80 caracteres');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

