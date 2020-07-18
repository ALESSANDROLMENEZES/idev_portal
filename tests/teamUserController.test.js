const teamUserController = require("../controllers/teamUserController");

let teamUser = {teamId:'0', userId:'3', challengeId:'3'};

test('Deve criar um novo time com o desafio id: 3 e adicionar o participante id:3 ', async () => {
    
    let result = teamUserController.store(teamUser);
    expect(result.id).toBeGreaterThan(2);

});

test('Não pode criar um novo time, deve apenas adicionar o usuário id 6 no time 1 ', async () => {
    
    teamUser.teamId = 1;
    teamUser.userId = 6;
    teamUser.challengeId = 1;

    let result = teamUserController.store(teamUser);
    expect(result.teamId).toBe(1);

});