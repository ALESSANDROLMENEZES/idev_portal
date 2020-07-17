/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
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
        model: 'Challenge',
        key: 'id'
      }
    }
  }, {
      tableName: 'teams',
      timestamps:false,
  });

  Team.associate = (models) => {
    
    Team.belongsToMany(models.User, {
      through: 'team_users',
      as: 'members',
      foreignKey: 'teamId'
    });

  };

  return Team;

};
