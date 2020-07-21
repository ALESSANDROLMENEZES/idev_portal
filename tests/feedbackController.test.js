const feedbackController = require('../controllers/feedbackController');
const teamController = require('../controllers/teamController');

let feedback = {
    teamId: 1,
    comment: '',
    score: 0,
    userId: 6,
    statusId: 3
};

let team = {
    id: 1,
    challengeId: 1,
    statusId: 2
};


test('Retornar mensagem de time sem moeda ou desafio não finalizado ', async () => {
    
    let result = await feedbackController.store(feedback);
    expect(result.msg).toBe('O time não concluiu o desafio ou não possui moedas suficiente');
    
});


test('Deve retornar o status do time alterado para realizar feedback ', async () => {
    let result = await teamController.update(team);
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve salvar um novo feedback ', async () => {
    
    const teamBefore = await teamController.show(feedback.teamId);
    let result = await feedbackController.store(feedback);

    const teamAfter = await teamController.show(feedback.teamId);
    const scoreBefore = teamBefore.members[0].score;
    const scoreAfter = teamAfter.members[0].score;
    expect(result.id).toBeGreaterThan(4);
    expect(scoreAfter).toBeGreaterThan(scoreBefore);
    
});

test('Deve apenas atualizar um feedback ', async () => {

    feedback.comment = 'Lorem ipsum lo da lor, e setbem ale aser nameise dalaroe';
    feedback.score = 7;
    feedback.statusId = 4;
    
    const teamBefore = await teamController.show(feedback.teamId);
    let result = await feedbackController.store(feedback);
    const teamAfter = await teamController.show(feedback.teamId);

    const scoreBefore = teamBefore.members[0].score;
    const scoreAfter = teamAfter.members[0].score;
    feedback.id = result.id;
    expect(result.comment).toEqual('Lorem ipsum lo da lor, e setbem ale aser nameise dalaroe');
    expect(result.id).toBeGreaterThan(4);
    expect(scoreAfter).toBeGreaterThan(scoreBefore);
    
});

test('Deve trazer o feedback atualizado ', async () => {
    const result = await feedbackController.show(feedback.id);
    expect(result.comment).toBe('Lorem ipsum lo da lor, e setbem ale aser nameise dalaroe');
});

test('deve excluir o feedback ', async () => {
    const result = await feedbackController.destroy(feedback.id);
    expect(result.id).toBeGreaterThan(5);
});

test('Deve trazer um objeto vazio ', async () => {
    const result = await feedbackController.show(feedback.id);
    expect(result).toEqual({});
});

test('Deve listar os feedbacks do banco ', async () => {
    const result = await feedbackController.index();
    expect(result.length).toBeGreaterThan(3);
});