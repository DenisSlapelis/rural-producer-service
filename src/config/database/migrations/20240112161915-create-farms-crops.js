'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('farms_crops', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
            cropId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'crop_id',
                references: {
                    model: 'crops',
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
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

        return queryInterface.bulkInsert('crops', [
            {
                name: 'Soja',
                created_at: new Date(),
                created_by: 1,
            },
            {
                name: 'Milho',
                created_at: new Date(),
                created_by: 1,
            },
            {
                name: 'Algodão',
                created_at: new Date(),
                created_by: 1,
            },
            {
                name: 'Café',
                created_at: new Date(),
                created_by: 1,
            },
            {
                name: 'Cana de Açucar',
                created_at: new Date(),
                created_by: 1,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('crops');
    },
};
