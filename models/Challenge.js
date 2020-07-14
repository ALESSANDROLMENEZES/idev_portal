/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Challenge', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'title': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null"
    },
    'subtitle': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null"
    },
    'slides': {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'default',
      comment: "null"
    },
    'text': {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "null"
    },
    'score': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'expiresAt': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
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
    'xp': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'moduleId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Module',
        key: 'id'
      }
    },
    'statusId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Challenge_status',
        key: 'id'
      }
    }
  }, {
    tableName: 'challenges'
  });
};
