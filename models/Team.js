/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Team', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'challengeId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Challenges',
        key: 'id'
      }
    }
  }, {
    tableName: 'teams'
  });
};
