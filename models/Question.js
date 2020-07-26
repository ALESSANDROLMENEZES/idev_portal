/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'text': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'rightAnswerId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Answer',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
      tableName: 'questions',
      timestamps:false,
  });

  Question.associate = (models) => {
    Question.belongsToMany(models.Questionnaire, {
      through: 'questionnaires_questions',
      as: 'quetions_questionnaires',
      foreignKey: 'questionId'
    });
  };

  return Question;

};
