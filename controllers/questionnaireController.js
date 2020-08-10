const { Questionnaire, Question, Answer, Class, QuestionAnswer, QuestionnaireQuestion } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    
    index: async (req, res) => {
        try {

            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { classId, questionId } = req.params;
            const { rows:result, count:size } = await Questionnaire.findAndCountAll({
                include: [
                    {
                        model: Question,
                        as: 'questions_questionnaires',
                        required: true,
                        include: [
                            {
                                model: Answer,
                                as: 'question_answers',
                                required: true,
                            }
                        ],
                        where:{id:questionId}
                    }
                ],
                where: {
                    classId,
                    avaliable:true
                }
            });
            return res.status(200).json({ size, result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }  
    },
    
    store: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { classId, title, avaliable =1 } = req.body;
            const classExist = await Class.findByPk(classId);
            if (!classExist) {
                return res.status(422).json({ error: true, msg: 'A aula informada não está disponível' });
            }
            const result = await Questionnaire.create({ classId, title, avaliable });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    destroy: async (req, res) => {
        const transaction = await Questionnaire.sequelize.transaction();
        try {

            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const questionnaireExist = await Questionnaire.findByPk(id);
            if (!questionnaireExist) {
                return res.status(422).json({ error: true, msg:'O questionário informado não está disponível'});
            }
            const result = await questionnaireExist.destroy();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    update: async (req, res) => {
        const transaction = await Questionnaire.sequelize.transaction();      
        try {

            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { title, classId, avaliable = 1 } = req.body;
            const questionnaireExist = await Questionnaire.findByPk(id);
            if (!questionnaireExist) {
            return res.status(422).json({ error: true, msg:'O questionário informado não está disponível'});

            }
            questionnaireExist.classId = classId;
            questionnaireExist.title = title;
            questionnaireExist.avaliable = avaliable;
            const result = await questionnaireExist.save();
            await transaction.commit();
            return res.status(200).json({ result });
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
            
        }
    },
    
    show: async (req, res) => {
        try {

            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const result = await Questionnaire.findByPk(id, {
                include:[{
                    model: Question,
                    as: 'questions_questionnaires',
                    required: true,
                    include: [
                        {
                            model: Answer,
                            as: 'question_answers',
                            required: true,
                        }
                    ]
                }]
            });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
    storeAnswersAndLinkAllToQuestionAndQuestionnaire: async (req, res) => {
        const transaction = await Answer.sequelize.transaction();
        try {
            
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { answers = [], question = {}, questionnaire = {} } = req.body;
            let rightAnswerIndex = parseInt(question.rightAnswerId) || 0;

            if (!answers[0]) {
                return res.status(422).json({ error: true, msg: 'Informe as perguntas em formato de array' });
            }

            if (rightAnswerIndex < 1 || rightAnswerIndex > answers.length) {
                return res.status(422).json({ error: true, msg:`A resposta correta para a questão deve ser de 1 à ${answers.length}`});
            }
            --rightAnswerIndex;

            if (!question.text || !question.rightAnswerId) {
                return res.status(422).json({ error: true, msg: 'Informe uma pergunta para o questionário' });  
            }

            if (!questionnaire.title || !questionnaire.classId) {
                return res.status(422).json({ error: true, msg: 'Informe os dados do questionário' }); 
            }

            const createdAnswers = await Answer.bulkCreate(answers);
            
            question.rightAnswerId = createdAnswers[rightAnswerIndex].id;
            
            const createdQuestion = await Question.create(question);
            
            const answersToQuestion = createdAnswers.map((q) => {
                return { questionId: createdQuestion.id, answerId: q.id };
            });
            
            await QuestionAnswer.bulkCreate(answersToQuestion);
            
            const createdQuestionnaire = await Questionnaire.create(questionnaire);
            
            const result = await QuestionnaireQuestion.create({
                questionnaireId: createdQuestionnaire.id,
                questionId: createdQuestion.id
            });
            
            await transaction.commit();
            
            return res.status(200).json({ result });
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
    
};