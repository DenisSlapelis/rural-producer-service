import { database } from '@env';
import { injectable } from "tsyringe";
import { CropRepository } from '@interfaces/crop-repository.interface';
import _ from 'lodash';
import { Op } from 'sequelize';

@injectable()
export class SQLiteCropRepository implements CropRepository {
    async getList(crops: string[]): Promise<number[]> {
        const options = {
            where: {
                name: {
                    [Op.in]: crops
                }
            }
        }

        return database.findAll('Crop', options);
    }

    getAll() {
        return database.findAll('Crop', {});
    }
}
