/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QuestionnaireQuestion', {
    'questionnaireId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Questionnaire',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    'questionId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Question',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
      tableName: 'questionnaires_questions',
      timestamps:false,
  });
};
