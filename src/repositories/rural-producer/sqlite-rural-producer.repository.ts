import { CreateRuralProducerModelDTO, UpdateRuralProducerDTO } from '@dtos/rural-producer.dto';
import { database } from '@env';
import { RuralProducerRepository } from '../../interfaces/rural-producer-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class SQLiteRuralProducerRepository implements RuralProducerRepository {
    create(params: CreateRuralProducerModelDTO) {
        return database.create('RuralProducer', params);
    }

    list(options: any) {
        return database.findAll('RuralProducer', options);
    }

    get(options: any) {
        const filter = {
            where: {
                ...options,
            }
        }

        return database.findOne('RuralProducer', filter);
    }

    getById(id: number) {
        return database.findById('RuralProducer', id);
    }

    update(id: number, fields: UpdateRuralProducerDTO, updatedBy: number) {
        const newValues = {
            document: fields.document,
            name: fields.name,
            updatedBy
        }

        const where = {
            where: { id, deletedAt: null }
        };

        return database.update('RuralProducer', newValues, where);
    }

    delete(id: number, deletedBy: number) {
        const newValues = {
            deletedBy
        }

        const where = {
            id, deletedAt: null
        };

        return database.delete('RuralProducer', newValues, where);
    }
}
