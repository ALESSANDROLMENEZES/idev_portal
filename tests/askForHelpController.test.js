const askForHekpController = require('../controllers/askForHelpController');
const askForHelpController = require('../controllers/askForHelpController');

const askForHelp = {
    title: 'Somebody help me',
    description: 'I remember this song, and I need help to translate it'
};

test('Deve salvar um pedido de ajuda ', async () => {
    const result = await askForHelpController.store(askForHelp);
    askForHelp.id = result.id;
    expect(result.title).toBe('Somebody help me');
});

test('Deve exibir a solicitação de ajuda que acabou de salvar ', async () => {
    const result = await askForHelpController.show(askForHelp.id);
    expect(result.title).toBe('Somebody help me');
});