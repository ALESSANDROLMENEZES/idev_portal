/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const UserClassDone = sequelize.define('UserClassDone', {
        'id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
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
        },
        'percentDone': {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false,
            comment: "null"
        },
        'likes': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue:'0',
            comment: "null",
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
        tableName: 'users_classes_done',    
    });

    UserClassDone.associate = (models) => {
        UserClassDone.belongsTo(models.Class, {
            as: 'class_done',
            foreignKey: 'classId'
        });

        UserClassDone.belongsTo(models.User, {
            as: 'user_classdone',
            foreignKey: 'userId'
          });
    };

    return UserClassDone;
};