/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Question_answer', {
    'questionId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Question',
        key: 'id'
      }
    },
    'answerId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Answer',
        key: 'id'
      }
    }
  }, {
      tableName: 'questions_answers',
      timestamps:false,
  });
};
