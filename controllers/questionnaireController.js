const { Questionnaire, Question } = require('../models');

module.exports = {

    index: async (classId) => {
      try {
          const result = await Questionnaire.findAndCountAll({
              include: [
                  {
                  model: Question,
                  as: 'quetions_questionnaires',
                  required:true
                  }
              ],
              where: {
                  classId,
                  avaliable:true
              }
          });
          return result;
      } catch (error) {
          console.log(error);
          return { error:true, status:422, msg:error.message};
      }  
    },

};