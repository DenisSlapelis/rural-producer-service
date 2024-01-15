import { CreateFarmDTO } from '@dtos/farm.dto';
import { dependencies } from '@env';
import { InMemoryDatabase } from '../../config/database/InMemoryDatabase.adapter';
import { FarmRepository } from '../../interfaces/farm-repository.interface';
import { injectable } from "tsyringe";
import _ from 'lodash';
const database = dependencies.resolve(InMemoryDatabase);

@injectable()
export class InMemoryFarmRepository implements FarmRepository {
    create(params: CreateFarmDTO) {
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

    getById(id: number) {
        return database.findById('Farm', id);
    }

    getCrops(farmId: number) {
        throw new Error('')
    }
}
