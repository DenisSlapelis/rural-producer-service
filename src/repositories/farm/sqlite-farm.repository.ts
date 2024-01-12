import { CreateFarmDTO } from '@dtos/farm.dto';
import { database } from '@env';
import { FarmRepository } from 'src/interfaces/farm-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class SQLiteFarmRepository implements FarmRepository {
    create(params: CreateFarmDTO) {
        return database.create('Farm', params);
    }

    getById(id: number) {
        return database.findById('Farm', id);
    }
}
