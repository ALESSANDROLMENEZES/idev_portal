/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'comment': {
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
    'userId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'User',
        key: 'id'
      }
    },
    'statusId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Feedback_status',
        key: 'id'
      }
    },
    'teamId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Team',
        key: 'id'
      }
    }
  }, {
      tableName: 'feedbacks',
      timestamps:false,
  });
};
