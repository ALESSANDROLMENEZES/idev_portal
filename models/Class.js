/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Class = sequelize.define('Class', {
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
    'resume': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'text': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'code': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'slides': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'video': {
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
    }
  }, {
    tableName: 'classes'
  });

  Class.associate = (models) => {
    Class.belongsToMany(models.Module, {
      through: 'modules_classes',
      as: 'class_module',
      foreignKey: 'classId'
    });
  };

  return Class;
};
