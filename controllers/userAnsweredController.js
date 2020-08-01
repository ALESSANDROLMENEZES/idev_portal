const { UserAnswered, Question, Answer } = require('../models');
const connectedUser = { id: 1 };

const rightMessages = [
    'Boa, Você acertou!!!',
    'Muito bem, você acertou!!!',
    'Aeee! Acertou, continue progredindo',
    'Sensacional, Você está indo muito bem',
    'Certo!!! Arrasou, já pode se considerar um expert,',
    'Uauu... Você está demais',
    'Uhuuu... Estou me apaixonando pela sua inteligência',
    'Muito bem humano, eu máquina começo a entender você',
    'Acertou, Estou sem palavras, você fera demais',
    'Incrível, essa foi difícil até pra mim, mas você acertou',
    'Uau Acertou, prefere que eu te chame de Smart ou Nerd?, rs',
    'Eeee está certa sua resposta',
    'Acertou, And the oscar goes to YOUU',
    'Sua resposta está correta'
];
const wrongMessages = [
    'Oops, sua resposta está incorreta',
    'Errou, Os erros fazem parte do aprendizado',
    'Errou, O que acha da ideia de revisar o material?',
    'Resposta errada',
    'Resposta incorreta, Essa foi difícil, neh?',
    'Você errou',
    'Lamento, você errou'
];

const validateCorretlyAnswer = async(userAnswer, correctAnswer)=>{
    const right = userAnswer === correctAnswer;
    if (right) {
        return { right, msg: rightMessages[parseInt(Math.random() * rightMessages.length - 1)] };
    }
    return { right, msg: wrongMessages[parseInt(Math.random() * wrongMessages.length - 1)] };
};

module.exports = {
    
    store: async (userAnswered) => {
        const transaction = await UserAnswered.sequelize.transaction();
        try {
            const questionExist = await Question.findByPk(userAnswered.questionId);
            if (!questionExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrado o questionário informado'});
            }
            const answerExist = await Answer.findByPk(userAnswered.answerId);
            
            if (!answerExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrado a resposta informada'});
            }
            
            userAnswered.userId = connectedUser.id;
            const result = await UserAnswered.create(userAnswered);
            await transaction.commit();

            const message = await validateCorretlyAnswer(userAnswered.answerId, questionExist.rightAnswerId);

            return res.status(200).json({ result, message });
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    update: async (userAnswered) => {
        const transaction = await UserAnswered.sequelize.transaction();
        try {
            const userAnswerExist = await UserAnswered.findByPk(userAnswered.id);
            if (!userAnswerExist) {
                return res.status(422).json({ error: true, msg:'Não foi encontrado a resposta informada'});
            }
            userAnswered.userId = connectedUser.id;
            const result = await UserAnswered.update(userAnswered, {
                where: {
                    questionId: userAnswered.questionId,
                    userId: userAnswered.userId,
                }
            });
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    }
    
};