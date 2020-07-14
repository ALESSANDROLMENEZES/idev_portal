/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Questionnaire_question', {
    'questionnaireId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Questionnaire',
        key: 'id'
      }
    },
    'questionId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Question',
        key: 'id'
      }
    }
  }, {
    tableName: 'questionnaires_questions'
  });
};
