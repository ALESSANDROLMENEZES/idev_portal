const userClassDoneController = require('../controllers/userClassDoneController');

const userClassDoneA = {classId:2, percentDone:0, userId:0};
const userClassDoneB = {classId:3, percentDone:0, userId:0};
const userClassDoneC = {classId:6, percentDone:0, userId:0};

test('Deve salvar uma nova aula concluida ', async () => {
    await userClassDoneController.store(userClassDoneA);
    await userClassDoneController.store(userClassDoneB);
    const result = await userClassDoneController.store(userClassDoneC);
    console.log(result);
    expect(result.id).toBeGreaterThan(1);
});