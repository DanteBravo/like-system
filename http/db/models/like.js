'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            super.belongsTo(models.User, {
                foreignKey: 'user_id'
            });

            super.belongsTo(models.Post, {
                foreignKey: 'post_id'
            });
        }
    }

    Like.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        createdAt: {
            field: 'created_at',
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            field: 'updated_at',
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        underscored: true,
        sequelize,
        modelName: 'Like',
        tableName: 'likes',
    });
    return Like;
};