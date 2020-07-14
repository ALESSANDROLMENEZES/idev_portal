/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Team_user', {
    'teamId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    'userId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'team_users'
  });
};
