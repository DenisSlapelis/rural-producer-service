import { RuralProducerRepository } from '@interfaces/rural-producer-repository.interface';
import { GetRuralProducerByIdUseCase } from './get-rural-producer-by-id.use-case';
import { UpdateRuralProducerDTO } from '@dtos/rural-producer.dto';
import { Document } from '@entities/value-objects/document.value-object';

export class UpdateRuralProducerUseCase {
    constructor(
        private repository: RuralProducerRepository,
        private getByIdUseCase: GetRuralProducerByIdUseCase
    ) {
    }

    update = async (id: number, fields: UpdateRuralProducerDTO, updatedBy: number) => {
        const document = Document.create(fields.document).formatDocumentOutputWithMask();

        await this.checkIfExists(id);

        await this.repository.update(id, { name: fields.name, document }, updatedBy);

        return this.getByIdUseCase.getById(id);
    }

    private async checkIfExists(id: number) {
        await this.getByIdUseCase.getById(id);
    }
}
