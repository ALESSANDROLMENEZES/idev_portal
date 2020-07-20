const teamController = require("../controllers/teamController");
let team = { id: 0, challengeId: 1, statusId:2 };
test('Deve solicitar o id de um desafio ', async () => {
    let result = await teamController.store();
    expect(result.msg).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar o id de um desafio ', async () => {
    let result = await teamController.store({});
    expect(result.msg).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar o id de um desafio ', async () => {
    let result = await teamController.store('a');
    expect(result.msg).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve criar um novo time ', async () => {
    let result = await teamController.store(team);
    team.id = result.id;
    expect(result.challengeId).toBe(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar mensagem de desafio expirado ', async () => {
    let teamError = { id: 6, challengeId: 6, statusId:2 };
    let result = await teamController.store(teamError);
    expect(result.msg).toBe("Este desafio expirou");
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar uma mensagem de time indisponível ', async () => {
    let result = await teamController.update({id:50, challengeId:'Teste'});
    expect(result.msg).toBe('O time informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar um erro de id inválido ', async () => {
    let result = await teamController.update({id:'ab'});
    expect(result.msg).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve atualizar  ', async () => {
    team.challengeId = 2;
    let result = await teamController.update(team);
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar um erro avisando que o time não existe  ', async () => {
    let result = await teamController.update({ ...team, id:50 });
    expect(result.msg).toBe('O time informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve atualizar ', async () => {
    team.challengeId = 1;
    let result = await teamController.update(team);
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve informar que o time informado não está disponível ', async () => {
    team.challengeId = 1;
    let result = await teamController.destroy(50);
    expect(result.msg).toBe('O time informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve informar que o time informado não está disponível ', async () => {
    team.challengeId = 1;
    let result = await teamController.destroy(50);
    expect(result.msg).toBe('O time informado não está disponível');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});


test('Deve excluir o time salvo anteriormente ', async () => {
    let result = await teamController.destroy(team.id);
    expect(result).toEqual(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve listar os membros do time ', async () => {
    let result = await teamController.show(1);
    expect(result.members.length).toBeGreaterThan(1);
    expect(result.members).not.toBeNull();
    expect(result.members).not.toBeUndefined();
});

