/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const TeamUser = sequelize.define('TeamUser', {
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
  }, {
      tableName: 'team_users',
  });
  
  TeamUser.associate = (models) => {
    

    
  };
  
  return TeamUser;
};
