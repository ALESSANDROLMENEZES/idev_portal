const userModuleController = require('../controllers/userModuleController');

const userModule = { userId: 1, moduleId: 2 };

test('Deve dar acesso para o usuário id 1 para o módulo id 2 ', async () => {
    const result = await userModuleController.store(userModule);
    expect(result.created).toBe(true);
});

test('Deve listar todos os módulos disponíveis para o usuário id 1 ', async () => {
    const list = await userModuleController.index();
    console.log(list)
    expect(list.size).toBeGreaterThan(1);
});