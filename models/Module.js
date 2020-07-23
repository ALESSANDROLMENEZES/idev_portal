/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Module = sequelize.define('Module', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'title': {
      type: DataTypes.STRING(80),
      allowNull: false,
      comment: "null"
    },
    'avaliable': {
      type: DataTypes.BOOLEAN,
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
    tableName: 'modules'
  });

  Module.associate = (models) => {
    Module.belongsToMany(models.Class, {
      through: 'modules_classes',
      as: 'class_module',
      foreignKey: 'moduleId'
    });
  };

  return Module;
};
