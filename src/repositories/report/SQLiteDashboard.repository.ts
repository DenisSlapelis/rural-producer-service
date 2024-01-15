import { database } from '@env';
import { DashboardRepository } from '@interfaces/dashboard-repository.interface';
import _ from 'lodash';
import { Sequelize } from 'sequelize';

export class SQLiteDashboardRepository implements DashboardRepository {
    constructor() { }

    async getTotalFarms() {
        const result = await database.count('Farm', {});

        return { total: result };
    }

    async getTotalArea() {
        const result = await database.sum('Farm', 'totalArea');

        return { total: result };
    }

    async getFarmsGroupedByState() {
        return database.findAll('Farm', {
            attributes: [
                'state',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total'],
            ],
            group: 'state',
        });
    }

    async getDataGroupedByCrops() {
        const result = await database.findAll('FarmCrop', {
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('FarmCrop.farm_id')), 'total'],
            ],
            group: 'FarmCrop.crop_id',
            include: 'Crop'
        });

        return result.map(row => {
            return {
                name: row.Crop.name,
                total: row.total,
            }
        });
    }

    async getDataGroupedCategory() {
        return database.findAll('Farm', {
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('agricultural_area')), 'totalAgriculturalArea'],
                [Sequelize.fn('SUM', Sequelize.col('vegetation_area')), 'totalVegetationArea'],
            ],
        });
    }
}
