import { CreateRuralProductorDTO } from '@dtos/rural-productor.dto';
import { database } from '@env';
import { RuralProductorRepository } from 'src/interfaces/rural-productor-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class SQLiteRuralProductorRepository implements RuralProductorRepository {
    create(params: CreateRuralProductorDTO) {
        return database.create('RuralProductor', params);
    }

    list(options: any) {
        return database.findAll('RuralProductor', options);
    }

    get(options: any) {
        return database.findOne('RuralProductor', options);
    }

    getById(id: number) {
        return database.findById('RuralProductor', id);
    }

    update() {
        throw new Error('Method not implemented.');
    }

    delete() {
        throw new Error('Method not implemented.');
    }
}
