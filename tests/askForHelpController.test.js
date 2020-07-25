const askForHelpController = require('../controllers/askForHelpController');

const askForHelp = {
    id: 0,
    title: 'Somebody help me',
    description: 'I remember this song, and I need help to translate it',
    userId:1,
};

test('Deve salvar um pedido de ajuda ', async () => {
    const result = await askForHelpController.store(askForHelp);
    askForHelp.id = result.id;
    expect(result.title).toBe('Somebody help me');
});

test('Deve exibir a solicitação de ajuda que acabou de salvar ', async () => {
    const result = await askForHelpController.show(askForHelp.id);
    expect(result.title).toBe('Somebody help me');
    expect(result.ask_user.id).toBe(1);
});

test('Deve listar todas as solicitações de ajuda ', async () => {
    const result = await askForHelpController.index(askForHelp.id);
    expect(result.length).toBeGreaterThan(4);
});


test('Deve excluir o ultimo pedido de ajuda ', async () => {
    await askForHelpController.destroy(askForHelp.id);
    const result = await askForHelpController.show(askForHelp.id);
    expect(result).toEqual({});
});