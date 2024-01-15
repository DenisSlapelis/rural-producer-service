import { dependencies } from '@env';
import { DashboardRepository } from '@interfaces/dashboard-repository.interface';
import _ from 'lodash';
import { InMemoryDatabase } from '../../config/database/InMemoryDatabase.adapter';
const database = dependencies.resolve(InMemoryDatabase);

export class InMemoryDashboardRepository implements DashboardRepository {
    constructor() { }

    async getTotalFarms() {
        const result = await database.count('Farm');

        return { total: result };
    }

    async getTotalArea() {
        const result = await database.sum('Farm', 'totalArea');

        return { total: result };
    }

    async getFarmsGroupedByState() {
        const data = database.findAll('Farm', {});

        const grouped = _.groupBy(data, 'state');

        const result: any = [];

        for (const key in grouped) {
            result.push({
                state: key,
                total: grouped[key].length
            });
        }

        return result;
    }

    async getDataGroupedByCrops() {
        const FarmCropData = database.findAll('FarmCrop', {});
        const CropData = database.findAll('Crop', {});

        const grouped = _.groupBy(FarmCropData, 'cropId');

        const result: any = [];

        for (const key in grouped) {
            const crop = CropData.find(crop => crop.id == key);
            result.push({
                name: crop.name,
                total: grouped[key].length,
            });
        }

        return result;
    }

    async getDataGroupedCategory() {
        const totalAgriculturalArea = database.sum('Farm', 'agriculturalArea');
        const totalVegetationArea = database.sum('Farm', 'vegetationArea');

        return [{
            totalAgriculturalArea,
            totalVegetationArea
        }]
    }
}
