/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Challenge_status', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    }
  }, {
      tableName: 'challenge_status',
      timestamps:false,
  });
};
