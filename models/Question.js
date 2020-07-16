/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Question', {
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
      }
    }
  }, {
      tableName: 'questions',
      timestamps:false,
  });
};
