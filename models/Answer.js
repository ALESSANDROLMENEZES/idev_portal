/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define('Answer', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'description': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'createdAt': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'updatedAt': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'avaliable': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1',
      comment: "null"
    }
  }, {
    tableName: 'answers'
  });

  Answer.associate = (models) => {
    Answer.belongsToMany(models.Question, {
      through: 'questions_answers',
      as: 'question_answers',
      foreignKey: 'answerId'
    });
  };

  return Answer;
};
