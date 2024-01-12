import { CreateFarmDTO } from '@dtos/farm.dto';
import { dependencies } from '@env';
import { InMemoryDatabase } from '../../config/database/InMemoryDatabase.adapter';
import { FarmRepository } from '../../interfaces/farm-repository.interface';
import { injectable } from "tsyringe";
const database = dependencies.resolve(InMemoryDatabase);

@injectable()
export class InMemoryFarmRepository implements FarmRepository {
    create(params: CreateFarmDTO) {
        return database.create('Farm', params);
    }
}
