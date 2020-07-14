/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'username',
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'avatar': {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'default',
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'linkedin': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'github': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'score': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'xp': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'admin': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'active': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1',
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
    'coins': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '3',
      comment: "null"
    }
  }, {
    tableName: 'users'
  });
};
