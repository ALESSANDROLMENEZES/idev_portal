const teamUserController = require("../controllers/teamUserController");

let teamUser = {teamId:0, userId:3, challengeId:2, statusId:1};

test('Deve criar um novo time com o desafio id: 2 e adicionar o participante id:3 ', async () => {
    
    let result = await teamUserController.store(teamUser);
    teamUser.teamId = result.teamId;
    expect(result.teamId).toBeGreaterThan(2);
    expect(result.userId).toBe(3);

});

test('Deve retornar uma mensagem falando que o usuário já está em um desafio ', async () => {
    
    let result = await teamUserController.store(teamUser);
    expect(result.msg).toBe('Este usuário já está cadastrado em outro time');

});

test('Deve retirar o usuário do time ', async () => {
    let result = await teamUserController.destroy({ teamId:teamUser.teamId, userId:teamUser.userId });
    expect(result.teamId).toBe(teamUser.teamId);

});

test('Não pode criar um novo time, deve apenas adicionar o usuário id 6 no time 1 ', async () => {
    
    teamUser.teamId = 1;
    teamUser.userId = 6;
    teamUser.challengeId = 1;

    let result = await teamUserController.store(teamUser);
    expect(result.teamId).toBe(1);
    expect(result.userId).toBe(6);

});


test('Remover o usuário id 6 do time 1 ', async () => {
    
    teamUser.teamId = 1;
    teamUser.userId = 6;

    let result = await teamUserController.destroy({teamId:teamUser.teamId, userId:teamUser.userId});
    expect(result.teamId).toBe(1);
    expect(result.userId).toBe(6);

});

