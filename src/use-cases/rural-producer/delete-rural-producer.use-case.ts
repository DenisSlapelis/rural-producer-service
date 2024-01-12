import { RuralProducerRepository } from '@interfaces/rural-producer-repository.interface';
import { GetRuralProducerByIdUseCase } from './get-rural-producer-by-id.use-case';

export class DeleteRuralProducerUseCase {
    constructor(
        private repository: RuralProducerRepository,
        private geByIdUseCase: GetRuralProducerByIdUseCase
    ) {
    }

    delete = async (id: number, deletedBy: number) => {
        await this.checkIfExists(id);

        await this.repository.delete(id, deletedBy);
    }

    private async checkIfExists(id: number) {
        await this.geByIdUseCase.getById(id);
    }
}
