const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false
        },
        duration: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        seasons: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false
        },
    }, { timestamps: false }
  );
};