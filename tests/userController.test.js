const userController = require('../controllers/userController');

test('Listar usuários - Deve retornar 6', async () => {
    let users = await userController.index();
    expect(users.length).toBe(6);
});

test('O primeiro usuário deve ter id: 1 ', async () => {
    let users = await userController.index();
    expect(users[0].id).toBe(1);
});