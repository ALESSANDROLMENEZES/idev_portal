/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ModuleClass', {
    'moduleId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Module',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    'classId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Class',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
      tableName: 'modules_classes',
      timestamps:false,
  });
};
