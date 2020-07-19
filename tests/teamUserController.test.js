const teamUserController = require("../controllers/teamUserController");

let teamUser = {teamId:0, userId:3, challengeId:2};

test('Deve criar um novo time com o desafio id: 2 e adicionar o participante id:3 ', async () => {
    
    let result = await teamUserController.store(teamUser);
    expect(result.teamId).toBeGreaterThan(2);
    expect(result.userId).toBe(3);

});

test('Não pode criar um novo time, deve apenas adicionar o usuário id 6 no time 1 ', async () => {
    
    teamUser.teamId = 1;
    teamUser.userId = 6;
    teamUser.challengeId = 1;

    let result = await teamUserController.store(teamUser);
    expect(result.teamId).toBe(1);
    expect(result.userId).toBe(6);

});

