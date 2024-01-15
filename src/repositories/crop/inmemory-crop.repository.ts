import { dependencies } from '@env';
import { InMemoryDatabase } from '../../config/database/InMemoryDatabase.adapter';
import { injectable } from "tsyringe";
import { CropRepository } from '@interfaces/crop.interface';
const database = dependencies.resolve(InMemoryDatabase);

@injectable()
export class InMemoryCropRepository implements CropRepository {
    async getList(crops: string[]): Promise<number[]> {
        const options = {
            where: {
                name: crops,
            }
        };

        return database.findAll('Crop', options);
    }

    getAll() {
        return database.findAll('Crop', {});
    }
}
