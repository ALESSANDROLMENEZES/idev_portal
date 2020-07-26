/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Questionnaire = sequelize.define('Questionnaire', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'classId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Class',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    'title': {
      type: DataTypes.STRING(45),
      allowNull: false,
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
    'avaliable': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    }
  }, {
    tableName: 'questionnaires'
  });

  Questionnaire.associate = (models) => {
    Questionnaire.belongsToMany(models.Question, {
      through: 'questionnaires_questions',
      as: 'questions_questionnaires',
      foreignKey: 'questionnaireId'
    });
  };

  return Questionnaire;
};
