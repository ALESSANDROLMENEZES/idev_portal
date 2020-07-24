/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('askForHelp', {
      'id': {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
      },
      'title': {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "null"
      },
      'description': {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "null"
      },
      'userId': {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        comment: "null",
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      'avaliable': {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: '1',
        comment: "null"
      }
    }, {
      tableName: 'asks_for_helps'
    });
  };
  