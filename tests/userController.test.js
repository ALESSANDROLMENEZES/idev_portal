const userController = require('../controllers/userController');
const {User} = require('../models');

//beforeAll(async() => await User.sequelize.close());
afterAll(async() => await User.sequelize.close());

test('Listar usuários', async () => {
    let users = await userController.index();
    expect(users[5].email).toBe('alessandroadm@live.com');
});

test('Deve retornar mais de 5 usuários', async () => {
    let users = await userController.index();
    expect(users.length).toBeGreaterThan(5);
});

test('O primeiro usuário deve ter id: 1 ', async () => {
    let users = await userController.index();
    expect(users[0].id).toBe(1);
});

test('Não pode aceitar valores vazios', async () => {
    let user = {};
    let result = await userController.store(user);
    expect(result).toBe('Informe, email e senha');
});

test('Não pode aceitar salvar sem informar uma senha', async () => {
    let user = {name:'Username'};
    let result = await userController.store(user);
    expect(result).toBe('Informe, email e senha');
});

test('Deve retornar email inválido', async () => {
    let user = {email:'username', password:'123'};
    let result = await userController.store(user);
    expect(result).toBe('Email inválido');
});

test('Deve retornar email já cadastrado', async () => {
    let user = {email:'alessandroadm@live.com', password:'123'};
    let result = await userController.store(user);
    expect(result).toBe('Email já cadastrado');
});

test('Deve aceitar salvar', async () => {
    let n = parseInt(Math.random() * 1000);
    let user = {email:`username${n}@mail.com`, password:'123'};
    let { email, password } = await userController.store(user);
    expect({email, password}).toEqual({email:`username${n}@mail.com`, password:'123'});
});

test('Deve normalizar o email em lowercase', async () => {
    let n = parseInt(Math.random() * 1000);
    let user = {email:`USERNAME${n}@maiL.cOm`, password:'123'};
    let { email, password } = await userController.store(user);
    expect({email, password}).toEqual({email:`username${n}@mail.com`, password:'123'});
});