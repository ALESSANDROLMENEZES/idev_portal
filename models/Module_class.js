/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Module_class', {
    'moduleId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Module',
        key: 'id'
      }
    },
    'classId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Class',
        key: 'id'
      }
    }
  }, {
      tableName: 'modules_classes',
      timestamps:false,
  });
};
