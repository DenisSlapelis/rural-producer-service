import { CreateRuralProductorParams } from '@dtos/rural-productor.dto';
import { dependencies } from '@env';
import { InMemoryDatabase } from '../../config/database/InMemoryDatabase.adapter';
import { RuralProductorRepository } from '../../interfaces/rural-productor-repository.interface';
import { injectable } from "tsyringe";
const database = dependencies.resolve(InMemoryDatabase);

@injectable()
export class InMemoryRuralProductorRepository implements RuralProductorRepository {
    create(params: CreateRuralProductorParams) {
        return database.create('RuralProductor', params);
    }

    list(options: any) {
        return database.findAll('RuralProductor', options);
    }

    async get(options: any) {
        const filter = {
            where: {
                ...options,
            }
        }

        return database.findOne('RuralProductor', filter);
    }

    getById(id: number) {
        return database.findById('RuralProductor', id);
    }

    update() {
        throw new Error('Method not implemented.');
    }

    delete(id: number, deletedBy: number) {
        const newValues = {
            deletedBy
        }

        const where = {
            id, deletedAt: null
        };

        return database.delete('RuralProductor', newValues, where);
    }
}
