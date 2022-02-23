'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            super.hasMany(models.Like, {
                foreignKey: 'post_id',
            });
        }
    }

    Post.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        post: {
            type: DataTypes.STRING,
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        underscored: true,
        sequelize,
        modelName: 'Post',
        tableName: 'posts'
    });
    return Post;
};