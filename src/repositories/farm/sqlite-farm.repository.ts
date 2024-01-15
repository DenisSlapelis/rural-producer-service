import { CreateFarmDTO } from '@dtos/farm.dto';
import { database } from '@env';
import { FarmRepository } from 'src/interfaces/farm-repository.interface';
import _ from 'lodash';
import { Crop } from '@entities/crop.entity';
import { CropRepository } from '@interfaces/crop.interface';

export class SQLiteFarmRepository implements FarmRepository {
    constructor(private readonly cropRepository: CropRepository) {}

    async create(params: CreateFarmDTO) {
        return database.create('Farm', params);
    }

    async addCrops(farmId: number, crops: number[], createdBy: number) {
        const chunkCrops = _.chunk(crops, 3);

        for (const cropArr of chunkCrops) {
            const promises = cropArr.map(cropId => {
                return database.create('FarmCrop', {
                    farmId,
                    cropId,
                    createdBy,
                });
            });

            await Promise.all(promises);
        }
    }

    async getById(id: number) {
        return database.findById('Farm', id);
    }

    async getCrops(farmId: number) {
        const options = {
            where: { farmId }
        };

        const [farmCrops, allCrops] = await Promise.all([
            database.findAll('FarmCrop', options),
            this.cropRepository.getAll(),
        ]);

        const crops = farmCrops.map(crop => {
            const findCrop = allCrops.find(_crop => crop.id == _crop.id);

            return findCrop.name;
        });

        return crops.map(crop => new Crop(crop));
    }
}
