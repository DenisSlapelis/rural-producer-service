'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('farms', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            agriculturalArea: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'agricultural_area',
            },
            vegetationArea: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'vegetation_area',
            },
            totalArea: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'total_area',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'created_by',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at',
            },
            updatedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'updated_by',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at',
            },
            deletedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'deleted_by',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('farms');
    },
};
