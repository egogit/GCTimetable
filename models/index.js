const Sequelize = require('sequelize');
const Timetable = require('./timetable');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Timetable = Timetable;

Timetable.init(sequelize);
Timetable.associate(db);

module.exports = db;