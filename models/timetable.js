const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Timetable extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            classNo: {
                type: DataTypes.INTEGER,
            },
            semester: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(100),
            },
            type: {
                type: DataTypes.INTEGER,
            },
            credit: {
                type: DataTypes.INTEGER,
            },
            department: {
                type: DataTypes.STRING(1000),
            },
            lecturer: {
                type: DataTypes.STRING(100),
            },
            classTime: {
                type: DataTypes.STRING(100),
            },
            classroom: {
                type: DataTypes.STRING(100),
            },
            headCount: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Timetable',
            tableName: 'timetables',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {}
}