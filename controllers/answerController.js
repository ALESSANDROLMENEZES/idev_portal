const { Answer } = require('../models');

module.exports = {
  
    store: async (answer) => {
        try {
            const result = await Answer.create(answer);
            return result;
        } catch (error) {
            console.log(error);
            return { error: true, status:422, msg:error.message};
        }
    }
    
};