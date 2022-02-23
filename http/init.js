'use strict';

const fs = require('fs');
const path = require('path');

function setupDB() {
    const Sequelize = require('sequelize');

    let sequelize = new Sequelize(require(path.join(__dirname, '/db/config/config.json'))[process.env.NODE_ENV || 'development']);

    const db = {};

    fs.readdirSync(path.join(__dirname, '/db/models'))
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = require(path.join(__dirname, `/db/models/${file}`))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

module.exports.db = setupDB()