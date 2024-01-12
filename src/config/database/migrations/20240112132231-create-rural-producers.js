'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('rural_producers', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            farmId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'farm_id',
                references: {
                    model: 'farms',
                    key: 'id',
                },
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
        },);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('rural_producers');
    },
};
