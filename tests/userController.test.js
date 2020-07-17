const userController = require('../controllers/userController');
const { User } = require('../models');
let newUser = {};

afterAll(async() => await User.sequelize.close());

test('Listar usuários', async () => {
    let users = await userController.index({email:'alessandro', name:''});
    expect(users[5].email).toBe('alessandroadm@live.com');
    expect(users).not.toBeNull();
    expect(users).not.toBeUndefined();
});

test('Deve retornar mais de 5 usuários', async () => {
    let users = await userController.index({email:'', name:''});
    expect(users.length).toBeGreaterThan(5);
    expect(users).not.toBeNull();
    expect(users).not.toBeUndefined();
});

test('O primeiro usuário deve ter id: 1 ', async () => {
    let users = await userController.index({email:'', name:''});
    expect(users[0].id).toBe(1);
    expect(users).not.toBeNull();
    expect(users).not.toBeUndefined();
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
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar email inválido', async () => {
    let user = {email:'username', password:'123'};
    let result = await userController.store(user);
    expect(result).toBe('Email inválido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar email já cadastrado', async () => {
    let user = {email:'alessandroadm@live.com', password:'123'};
    let result = await userController.store(user);
    expect(result).toBe('Email já cadastrado');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve aceitar salvar', async () => {
    newUser.email = 'UserNamE987@maiL.Com';
    newUser.password = '123';
    let { id, email, password } = await userController.store(newUser);
    newUser.id = id;
    expect({ email }).toEqual({ email: 'username987@mail.com' });
    expect(email).not.toBeNull();
    expect(email).not.toBeUndefined();
    expect(password).not.toBeNull();
    expect(password).not.toBeUndefined();
});

test('Deve normalizar o email em lowercase', async () => {
    let { email } = newUser;
    expect({ email }).toEqual({ email: 'username987@mail.com' });
    expect(email).not.toBeNull();
    expect(email).not.toBeUndefined();
});

test('Deve retornar o usuário Alessandro ', async () => {
    let user = await userController.show({ email: 'Alessandroadm@Live.com', password:'123' });
    expect(user.name).toBe('Alessandro');
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
});

test('Deve retornar o informe um email ', async () => {
    let result = await userController.show({ });
    expect(result).toBe('Informe um email');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o usuário sem a senha ', async () => {
    let result = await userController.show({email:'alessandroadm@live.com' });
    expect(result.password).toBeUndefined();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o Email inválido ', async () => {
    let result = await userController.show({ email:'alessandro', password:'123'});
    expect(result).toBe('Email inválido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar Email ou senha inválido ', async () => {
    let result = await userController.show({ email:'alessandro@live.com', password:'123'});
    expect(result).toBe('Email inválido');
});

test('Não deve conseguir fazer o login com email incorreto ', async () => {
    let result = await userController.login({ email:'alessandro@live.com', password:'123'});
    expect(result).toBe('Email ou senha inválido');
});

test('Não deve conseguir fazer o login com a senha incorreta ', async () => {
    let result = await userController.login({ email:'alessandroadm@live.com', password:'senhaerrada'});
    expect(result).toBe('Email ou senha inválido');
});

test('Deve conseguir fazer o login com as credenciais corretas ', async () => {
    let result = await userController.login({ email:'alessandroadm@live.com', password:'123'});
    expect(result).toBe('Logado!');
});

test('Deve retornar o usuário alterado', async () => {
    let result = await userController.update({id:6, name:'Alexandre Silva'});
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar o usuário com o nome original', async () => {
    let result = await userController.update({id:6, name:'Alessandro'});
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar o id do usuario', async () => {
    let result = await userController.update({name:'Alessandro'});
    expect(result).toBe('Informe um usuário');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar solicitando um usuario', async () => {
    let result = await userController.update();
    expect(result).toBe('Informe um usuário');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});



test('Deve solicitar um id de usuário ', async () => {
    const result = await userController.destroy();
    expect(result).toBe('Informe um id');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar um usuário ', async () => {
    const result = await userController.destroy({});
    expect(result).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve excluir o último usuário salvo ', async () => {
    const result = await userController.destroy(newUser.id);
    expect(result).toBe(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar mensagem de usuário já excluido ', async () => {
    const result = await userController.destroy(newUser.id);
    expect(result).toBe('O usuário já foi excluido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('A exclusão anterior não pode ter excluido todos os usuário ', async () => {
    let users = await userController.index({email:'', name:''});
    expect(users.length).toBeGreaterThan(5);
    expect(users).not.toBeNull();
    expect(users).not.toBeUndefined();
});
